from pathlib import Path
import pymupdf as fitz
from PIL import Image
import json
import re
source=fitz.open('/Users/eliasmicha/Downloads/OMNIIOUS PRESENTACION-3.pdf')
# Page -> reviewed project identifiers. Preserve the presentation as the source of truth.
slugs={7:'ocean-club',8:'altitud-45',9:'nautica-residences',10:'nauma-san-angel',11:'cero5cien-g402',12:'oasis-5-y-6',13:'residence-35',14:'carso-15a',15:'cero5cien-l202',16:'ruta-del-lago',18:'arcos-bosques',19:'manuales-iluminacion-cinepolis-global',20:'cinepolis-puerta-aragon',21:'cinepolis-ensenada',22:'tan-me',23:'corsi-jw-marriott',24:'estadio-tepic',25:'guerrero-negro-bahia-tortugas',28:'city-fresko',29:'pico-love',30:'chapultepec-uno',32:'ignacia-guest-house',33:'secrets-cancun',35:'color-del-ano-comex',36:'superficies-inestables',37:'design-hunter'}
manifest=[]
for number,slug in slugs.items():
 page=source[number-1]
 infos=[i for i in page.get_image_info(xrefs=True) if i['width']>100 and i['height']>100]
 # Render only the photograph/plan panel, respecting PDF masks, crops and multi-photo layouts.
 top=max(117,min(i['bbox'][1] for i in infos));left=max(510,min(i['bbox'][0] for i in infos))
 # The exported PDF clips images below its header. Image bounding boxes alone
 # include hidden portions and create beige bands. Respect those source clips.
 clips=[]
 for match in re.finditer(r'([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) re\s+W\*?',page.read_contents().decode('latin1')):
  x,y,w,h=map(float,match.groups())
  if x>2000 and w>300 and h>1000:
   clips.append(fitz.Rect(x*.24,y*.24,(x+w)*.24,(y+h)*.24))
 # Page 35 mixes clipped and unclipped images: keep its complete collage.
 if clips and number != 35:
  panel=fitz.Rect(clips[0])
  for rect in clips[1:]: panel |= rect
  clip=panel & page.rect
 else:
  clip=fitz.Rect(left,top,1440,810)
 pix=page.get_pixmap(matrix=fitz.Matrix(1.5,1.5),clip=clip,alpha=False)
 im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
 dest=Path('public/projects')/slug;dest.mkdir(exist_ok=True)
 im.save(dest/'presentation.webp','WEBP',quality=88)
 manifest.append({'page':number,'slug':slug,'image':'/projects/'+slug+'/presentation.webp','width':im.width,'height':im.height,'text':page.get_text()})
Path('data/presentation-source.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print('Extracted',len(manifest),'project panels')
