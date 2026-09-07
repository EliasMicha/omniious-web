# Portfolio import

Source: user-supplied `OMNIIOUS PRESENTACION-3.pdf`, 39 pages.

- `extract-presentation.py` extracts the existing project image panels without generating replacements.
- `prepare-projects.py` records the project facts and concise descriptions from those pages.
- `data/projects-import.json` is the reviewed initial import; live edits belong in Supabase, not this file.
- Preserve existing project IDs, uploaded covers, galleries and published state when importing existing slugs.
- Cinépolis Ensenada remains a draft: page 21 repeats the photo and part of the description from Puerta Aragón. Its distinct SAND scope is retained; replace its photo before publishing.
- Five projects retain the source label “En curso”. Some source images are renders, plans or collages; do not describe all images as completed-work photographs.

Public pages read only published rows. The administrator uses the existing Supabase Auth account; project and storage writes are restricted by RLS to its owner UUID. No service key is shipped to browsers.
