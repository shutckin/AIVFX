import json,colorsys,glob,os,sys
H=41/360.0
def conv(rgb):
    r,g,b=[max(0.0,min(1.0,float(x))) for x in rgb[:3]]
    h,l,s=colorsys.rgb_to_hls(r,g,b)
    if s<0.12: return None                     # нейтральные (белый/серый/чёрный) оставляем
    nl=min(0.70,max(0.34,l)); ns=min(0.95,max(0.60,s))
    return list(colorsys.hls_to_rgb(H,nl,ns))
def fix_color_prop(p):
    """p — свойство цвета вида {'a':0,'k':[r,g,b,a?]} или анимированное {'a':1,'k':[{s:[..],e:[..]}]}"""
    if not isinstance(p,dict) or 'k' not in p: return
    k=p['k']
    if isinstance(k,list) and k and all(isinstance(x,(int,float)) for x in k) and len(k)>=3:
        c=conv(k)
        if c: p['k']=c+list(k[3:])
    elif isinstance(k,list):
        for kf in k:
            if isinstance(kf,dict):
                for key in ('s','e'):
                    v=kf.get(key)
                    if isinstance(v,list) and len(v)>=3 and all(isinstance(x,(int,float)) for x in v):
                        c=conv(v)
                        if c: kf[key]=c+list(v[3:])
def fix_gradient(item):
    g=item.get('g')
    if not (isinstance(g,dict) and isinstance(g.get('k'),dict)): return
    n=g.get('p') or 0; arr=g['k'].get('k')
    if not (isinstance(arr,list) and arr and all(isinstance(x,(int,float)) for x in arr)): return
    for i in range(n):
        j=i*4
        if j+3<len(arr):
            c=conv(arr[j+1:j+4])
            if c: arr[j+1],arr[j+2],arr[j+3]=c
def walk_shapes(shapes):
    for it in shapes or []:
        if not isinstance(it,dict): continue
        ty=it.get('ty')
        if ty in ('fl','st'): fix_color_prop(it.get('c'))
        elif ty in ('gf','gs'): fix_gradient(it)
        elif ty=='gr': walk_shapes(it.get('it'))
def walk_layers(layers):
    for l in layers or []:
        walk_shapes(l.get('shapes'))
        if l.get('ty')==4 and 'it' in l: walk_shapes(l['it'])
        # эффекты «Fill» (ty 21) — цвет в ef[].v
        for ef in l.get('ef') or []:
            for v in ef.get('ef') or []:
                if v.get('ty')==2: fix_color_prop(v.get('v'))
for f in sorted(glob.glob(sys.argv[1])):
    d=json.load(open(f+'.orig'))
    walk_layers(d.get('layers'))
    for a in d.get('assets') or []: walk_layers(a.get('layers'))
    json.dump(d,open(f,'w'),separators=(',',':'))
    print(os.path.basename(f),'%.1fKB'%(os.path.getsize(f)/1024))
