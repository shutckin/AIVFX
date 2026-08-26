import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PHONE_COUNTRIES, PHONE_COUNTRY_BY_CODE } from '../data/phone-countries';

// ── Поле телефона с определением страны ────────────────────────────────
//
// Раньше форма умела только один формат: одиннадцать цифр, начинающихся
// с 7 или 8. Любой иностранный номер она либо коверкала, либо ругалась
// «слишком короткий». Теперь номер разбирается по правилам конкретной
// страны: слева выбор страны с кодом, справа номер, который форматируется
// по мере ввода и проверяется на реальную длину именно для этой страны.
//
// Правила нумерации для всех стран — это большая таблица, поэтому
// библиотека грузится отдельным файлом уже после появления страницы:
// на скорость первой загрузки она не влияет.

// Страна по умолчанию.
//
// В языке браузера часто зашит регион: ru-RU, ru-KZ, en-AE. Но слепо ему
// доверять нельзя: у множества русскоязычных посетителей система стоит на
// английском, и тогда браузер сообщает en-US. Поэтому:
//   на русской версии сайта — берём регион из русскоязычного тега (ru-KZ → KZ),
//   иначе Россия;
//   на английской версии — берём любой регион, какой сообщил браузер,
//   иначе США.
const guessCountry = (locale) => {
  const tags = typeof navigator === 'undefined'
    ? []
    : [navigator.language, ...(navigator.languages || [])].filter(Boolean).map(String);

  const regionOf = (tag) => {
    const region = tag.split('-')[1];
    return region && /^[A-Za-z]{2}$/.test(region) ? region.toUpperCase() : null;
  };

  if (locale === 'en') {
    for (const tag of tags) {
      const region = regionOf(tag);
      if (region) return region;
    }
    return 'US';
  }

  for (const tag of tags) {
    if (/^ru\b/i.test(tag)) {
      const region = regionOf(tag);
      if (region) return region;
    }
  }
  return 'RU';
};

const PhoneField = ({ value, onChange, onValidityChange, locale, label, id = 'phone' }) => {
  const en = locale === 'en';
  const [lib, setLib] = useState(null);
  // Стартовое значение зависит только от языка сайта, а не от браузера:
  // предзарендеренная страница и первый рендер обязаны совпасть.
  const [country, setCountry] = useState(en ? 'US' : 'RU');
  const [touched, setTouched] = useState(false);
  const inputRef = useRef(null);

  // Страну посетителя выясняем уже после появления страницы
  useEffect(() => {
    const guessed = guessCountry(locale);
    if (PHONE_COUNTRY_BY_CODE[guessed]) setCountry(guessed);
  }, [locale]);

  // Подгружаем таблицу нумерации после монтирования
  useEffect(() => {
    let alive = true;
    import('libphonenumber-js/max')
      .then((mod) => { if (alive) setLib(mod); })
      .catch(() => { /* без библиотеки поле остаётся обычным текстовым */ });
    return () => { alive = false; };
  }, []);

  const dial = PHONE_COUNTRY_BY_CODE[country]?.d || '';

  // Проверка: номер либо пустой (поле необязательное), либо корректный
  // именно для выбранной страны
  const isValid = useMemo(() => {
    const raw = String(value || '').trim();
    if (!raw) return true;
    if (!lib) return raw.replace(/\D/g, '').length >= 6;
    return lib.isValidPhoneNumber(raw, country);
  }, [value, country, lib]);

  useEffect(() => {
    if (onValidityChange) onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  const handleInput = (raw) => {
    // Разрешаем только то, что бывает в номере
    let next = raw.replace(/[^\d+\s()\-.]/g, '');

    if (lib) {
      // Человек вставил номер с кодом страны — переключаем страну сам
      if (next.trim().startsWith('+')) {
        const parsed = lib.parsePhoneNumberFromString(next);
        if (parsed && parsed.country && parsed.country !== country) {
          setCountry(parsed.country);
          onChange(new lib.AsYouType(parsed.country).input(next));
          return;
        }
      }
      next = new lib.AsYouType(country).input(next);
    }

    onChange(next);
  };

  const handleCountry = (code) => {
    setCountry(code);
    // Переформатируем уже введённое под новую страну
    const digits = String(value || '').replace(/^\+\d+/, '').trim();
    if (lib && digits) {
      onChange(new lib.AsYouType(code).input(digits));
    }
    if (inputRef.current) inputRef.current.focus();
  };

  const showError = touched && !isValid;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>

      <div className={`phone-row${showError ? ' phone-row--error' : ''}`}>
        <div className="phone-country">
          <select
            aria-label={en ? 'Country code' : 'Код страны'}
            value={country}
            onChange={(e) => handleCountry(e.target.value)}
          >
            {PHONE_COUNTRIES.map((c) => (
              <option key={c.c} value={c.c}>
                {`${en ? c.en : c.ru} +${c.d}`}
              </option>
            ))}
          </select>
          <span className="phone-country-view" aria-hidden="true">
            {`${country} `}<span className="phone-dial">{`+${dial}`}</span>
          </span>
        </div>

        <input
          id={id}
          ref={inputRef}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder={en ? 'Phone number' : 'Номер телефона'}
        />
      </div>

      {showError && (
        <span className="field-error">
          {en
            ? 'This number does not look valid for the selected country'
            : 'Номер не подходит под выбранную страну'}
        </span>
      )}
    </div>
  );
};

export default PhoneField;
