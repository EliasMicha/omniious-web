import json
from pathlib import Path
source=json.loads(Path('data/presentation-source.json').read_text())
# Editorial summaries transcribed from the supplied presentation; no inferred scope.
rows=[
('Ocean Club','GICSA','Niz + Chauvet','residencial','','2026',6800,'Diseño, suministro e instalación de iluminación. Ingeniería, implementación y puesta en marcha de CCTV, audio, control de acceso y redes.'),
('Altitud 45','Becherano Arquitectos','Niz + Chauvet','residencial','','2024',6800,'Diseño de iluminación para departamento muestra, lobby, áreas sociales, spa, alberca, gimnasio, restaurantes, rooftop y oficinas.'),
('Náutica Residences','Nauma','Niz + Chauvet','residencial','Cancún, Quintana Roo','En curso',12000,'Diseño de iluminación del complejo residencial e ingeniería de redes, audio ambiental, control de acceso, CCTV, detección y control de iluminación.'),
('Nauma San Ángel','Nauma','Niz + Chauvet','residencial','San Ángel','En curso',12000,'Diseño de iluminación del complejo e ingeniería de redes, audio ambiental, control de acceso, CCTV, detección y control de iluminación.'),
('Cero5Cien G402','','IZ Arquitectos · Habitación 116','residencial','','En curso',980,'Diseño de iluminación e instalaciones especiales. Suministro de luminarias y sistemas de control de iluminación, audio, video, CCTV y control de acceso.'),
('Oasis 5 y 6','','Modica Ledezma','residencial','','2025',2500,'Diseño integral de iluminación e ingeniería eléctrica. Ingeniería de CCTV, audio, control de iluminación, redes, telefonía y paneles solares.'),
('Residence 35','','IZ Arquitectos','residencial','','En curso',550,'Diseño de iluminación e instalaciones especiales; ejecución de instalaciones eléctricas y especiales; suministro y colocación de luminarias. Control, audio, video, CCTV, accesos, persianas y cortinas motorizadas.'),
('Carso 15A','','Nodo Interiores','residencial','','2025',400,'Diseño de iluminación e instalaciones eléctricas; suministro de luminarias y sistemas especiales de control de iluminación, audio y redes.'),
('Cero5Cien L202','','Gómez de Tuddo','residencial','','2026',800,'Diseño de iluminación e instalaciones especiales; ejecución eléctrica y de sistemas especiales; suministro y colocación de luminarias. Control, audio, video, CCTV, accesos, persianas y cortinas motorizadas.'),
('Ruta del Lago','','Gerbilsky Waingberg','residencial','Valle de Bravo','2023',2200,'Especificación de iluminación, diseño y ejecución de instalaciones especiales. Suministro de luminarias y sistemas de control, audio, video, CCTV, accesos, cascadas, persianas y cortinas.'),
('Arcos Bosques','GICSA','Niz + Chauvet','comercial','','2026',18000,'Iluminación e instalaciones eléctricas y especiales para lobby corporativo, motor lobby, food court, zona comercial, terraza, circulaciones y sanitarios. Suministro de luminarias, audio ambiental y redes.'),
('Manuales de iluminación Cinépolis Global','Cinépolis','','comercial','','2023',None,'Análisis de cines, rediseño de iluminación y comprobación en DIALux. Desarrollo de manuales de especificación SAND y BLUE, con pruebas piloto en Aragón y Ensenada.'),
('Cinépolis Puerta Aragón','Cinépolis','','comercial','Puerta Aragón','2023',4000,'Proyecto piloto del manual BLUE: diseño y rediseño de iluminación, suministro e instalación de luminarias y comprobación lumínica en sitio.'),
('Cinépolis Ensenada','Cinépolis','','comercial','Ensenada','2023',4000,'Proyecto piloto del manual SAND: diseño de iluminación, suministro e instalación de luminarias y comprobación lumínica en sitio.'),
('Tan Me','','Artigas Arquitectos','comercial','Artz Pedregal','2023',None,'Diseño de iluminación e instalaciones especiales; suministro de luminarias y sistemas de control de iluminación, audio, CCTV y control de acceso.'),
('Corsi — JW Marriott','Black Palm Development','Niz + Chauvet','hospitalidad','Polanco, Ciudad de México','2024',1000,'Remodelación de restaurante en el JW Marriott Polanco. Diseño de iluminación, instalaciones eléctricas y especiales; suministro de luminarias, control de iluminación, audio profesional, video y CCTV.'),
('Estadio Tepic','SEDATU','VEA Arquitectos','cultural','Nayarit','2023',None,'Diseño de iluminación del complejo de béisbol: cubierta, acceso, gradas, vestidores, gimnasios, áreas públicas, suites, restaurantes, food court, oficinas, área médica y taquillas.'),
('Guerrero Negro · Bahía Tortugas','SEDATU','VEA Arquitectos','cultural','','2022',None,'Diseño de iluminación para dos centros recreativos, incluyendo iluminación deportiva.'),
('City Fresko','La Comer','Carranza | Ruiz Arquitectos','corporativo','Ciudad de México','2022',None,'Diseño de iluminación de las oficinas directivas de La Comer y suministro de luminarias, instalaciones y accesorios eléctricos.'),
('Pico Love','Pico Love','Francisco Villegas','corporativo','','2026',None,'Ingeniería y ejecución eléctrica, diseño de iluminación y suministro de luminarias. Ingeniería, implementación y puesta en marcha de cortinas motorizadas, redes, audio y control de iluminación.'),
('Chapultepec Uno','','Niz + Chauvet','corporativo','','2025',None,'Diseño de iluminación e instalaciones especiales para despacho de abogados: recepción, lobby, oficinas, sala de consejo, comedor y cocineta. Audio, control de iluminación, redes y accesos.'),
('Ignacia Guest House','','Andrés Gutiérrez','hotelero','Ciudad de México','2022',None,'Diseño de iluminación para la ampliación del hotel: lobby, circulaciones, habitaciones, terraza y jacuzzi.'),
('Secrets Cancún','','Niz + Chauvet','hotelero','Cancún, Quintana Roo','En curso',None,'Proyecto de iluminación para la remodelación del hotel: lobby, áreas sociales, habitaciones tipo gazebo, exteriores, front desk y pasillos.'),
('Color del año Comex','Comex','Maye Ruiz · Ada Italian Design','exhibicion','','2022',None,'Colaboración para el color del año 2022: iluminación inteligente Ketra de Lutron en dos semicírculos de Barrisol para crear distintas atmósferas con un mismo color.'),
('Superficies Inestables','','Suarez Studios · Lutron','exhibicion','Claustro de Sor Juana','2023',None,'Diseño y programación de iluminación dinámica para una exposición en Celda Contemporánea, enfatizando la obra del artista.'),
('Design Hunter','Design Hunter','Suarez Studios · Lutron','exhibicion','','2024',None,'Instalación y programación de iluminación para Art Week en distintas áreas de la casa y un mural exterior, creando ambientes dinámicos y acogedores.')]
assert len(rows)==len(source)==26
out=[]
for i,(r,s) in enumerate(zip(rows,source)):
 p=dict(zip(['name','client','architect','category','location','year','area_m2','description'],r))
 p.update(slug=s['slug'],cover_image_url='https://www.omniious.com'+s['image'],gallery_urls=[],scope=[],display_order=(i+1)*10,published=True)
 # Ensenada repeats the Aragón photo in the supplied PDF; keep it as a draft for a correct photo.
 if s['slug']=='cinepolis-ensenada':p['published']=False
 featured=['ruta-del-lago','ignacia-guest-house','city-fresko','arcos-bosques','corsi-jw-marriott','superficies-inestables']
 p['display_order']=(featured.index(s['slug'])+1)*10 if s['slug'] in featured else 100+i*10
 out.append(p)
Path('data/projects-import.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
