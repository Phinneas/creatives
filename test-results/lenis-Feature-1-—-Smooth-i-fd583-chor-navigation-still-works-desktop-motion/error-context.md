# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lenis.spec.ts >> Feature 1 — Smooth inertial scrolling >> Anchor navigation still works
- Location: tests/motion/lenis.spec.ts:17:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a[href="#templates"]')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "The Juice Index — home" [ref=e4] [cursor=pointer]:
        - /url: /
        - generic [ref=e18]: The Juice Index
      - navigation "Primary" [ref=e19]:
        - link "Find chargers" [ref=e20] [cursor=pointer]:
          - /url: /#find
        - link "Networks" [ref=e21] [cursor=pointer]:
          - /url: /networks/
        - link "Routes" [ref=e22] [cursor=pointer]:
          - /url: /road-trips/
        - link "Cities" [ref=e23] [cursor=pointer]:
          - /url: /#cities
        - link "Guides" [ref=e24] [cursor=pointer]:
          - /url: /guides/
      - button "Switch between day and night mode" [ref=e26] [cursor=pointer]
  - main [ref=e29]:
    - generic [ref=e30]:
      - generic [ref=e31]:
        - img "A desert oasis EV charging station under a solar canopy" [ref=e32]
        - img "An EV charging station glowing at night" [ref=e33]
      - generic [ref=e35]:
        - generic [ref=e36]: 22,800+ stations indexed
        - heading [level=1] [ref=e38]:
          - text: Every charger,
          - emphasis [ref=e39]: ranked.
        - paragraph [ref=e40]: The Juice Index scores 22,800+ charging stations across 12 states on real-world reliability — so you charge with confidence, not guesswork.
        - search [ref=e41]:
          - textbox "Location" [ref=e46]:
            - /placeholder: City or state
          - link "Search" [ref=e47] [cursor=pointer]:
            - /url: /networks/
        - generic [ref=e48]:
          - generic [ref=e49]: "Popular:"
          - link "Seattle" [ref=e50] [cursor=pointer]:
            - /url: /washington/city/seattle/
          - link "Denver" [ref=e51] [cursor=pointer]:
            - /url: /colorado/city/denver/
          - link "Portland" [ref=e52] [cursor=pointer]:
            - /url: /oregon/city/portland/
          - link "Salt Lake City" [ref=e53] [cursor=pointer]:
            - /url: /utah/
          - link "Spokane" [ref=e54] [cursor=pointer]:
            - /url: /washington/
        - generic [ref=e55]:
          - generic [ref=e56]:
            - generic [ref=e57]: 22,800
            - generic [ref=e58]: stations indexed
          - generic [ref=e59]:
            - generic [ref=e60]: "5"
            - generic [ref=e61]: networks scored
          - generic [ref=e62]:
            - generic [ref=e63]: "12"
            - generic [ref=e64]: states covered
      - generic [ref=e65]: Scroll
    - generic [ref=e67]:
      - generic [ref=e68]: Reliability tracked across
      - generic [ref=e69]:
        - link "Tesla Supercharger" [ref=e70] [cursor=pointer]:
          - /url: /networks/tesla-supercharger/
        - link "Electrify America" [ref=e71] [cursor=pointer]:
          - /url: /networks/electrify-america/
        - link "EVgo" [ref=e72] [cursor=pointer]:
          - /url: /networks/evgo/
        - link "ChargePoint" [ref=e73] [cursor=pointer]:
          - /url: /networks/chargepoint/
        - link "Blink" [ref=e74] [cursor=pointer]:
          - /url: /networks/blink/
    - generic [ref=e76]:
      - paragraph [ref=e77]: The reference for EV charging — regionally deep, nationally bound.
      - paragraph [ref=e78]: We score every public charger on real reliability, verify the ones that matter in the field, and cover the corridors you actually drive. No sponsored placements. No guesswork.
    - generic [ref=e80]:
      - generic [ref=e81]:
        - generic [ref=e82]:
          - text: The Juice Index™
          - heading "Every major network, scored." [level=2] [ref=e83]
          - paragraph [ref=e84]: One transparent 0–100 score per network, built from millions of real charging sessions — not marketing claims.
        - link "Explore the full Index" [ref=e85] [cursor=pointer]:
          - /url: /networks/
      - generic [ref=e88]:
        - generic [ref=e89]:
          - text: Uptime
          - generic [ref=e91]: 40%
        - generic [ref=e92]:
          - text: Charge success
          - generic [ref=e94]: 30%
        - generic [ref=e95]:
          - text: Delivered speed
          - generic [ref=e97]: 20%
        - generic [ref=e98]:
          - text: Price & value
          - generic [ref=e100]: 10%
      - generic [ref=e101]:
        - generic [ref=e102]:
          - generic [ref=e103]: Rank
          - generic [ref=e104]: Network
          - generic [ref=e105]: Juice Score
          - generic [ref=e106]: Uptime
          - generic [ref=e107]: Avg speed
          - generic [ref=e108]: 90-day trend
        - generic [ref=e109]:
          - generic [ref=e110]: "1"
          - generic [ref=e111]:
            - generic [ref=e112]: T
            - generic [ref=e113]:
              - generic [ref=e114]: Tesla Supercharger
              - generic [ref=e115]: NACS · 6,800 stalls
          - generic [ref=e117]:
            - generic [ref=e118]: "96"
            - generic [ref=e119]: /100
          - generic [ref=e120]: 99.3%
          - generic [ref=e125]: 234 kW
          - generic [ref=e127]: "+1.2"
        - generic [ref=e132]:
          - generic [ref=e133]: "2"
          - generic [ref=e134]:
            - generic [ref=e135]: IO
            - generic [ref=e136]:
              - generic [ref=e137]: Ionity
              - generic [ref=e138]: CCS · 1,500 stalls
          - generic [ref=e140]:
            - generic [ref=e141]: "91"
            - generic [ref=e142]: /100
          - generic [ref=e143]: 98.1%
          - generic [ref=e148]: 286 kW
          - generic [ref=e150]: "+0.6"
        - generic [ref=e155]:
          - generic [ref=e156]: "3"
          - generic [ref=e157]:
            - generic [ref=e158]: EA
            - generic [ref=e159]:
              - generic [ref=e160]: Electrify America
              - generic [ref=e161]: CCS · NACS
          - generic [ref=e163]:
            - generic [ref=e164]: "84"
            - generic [ref=e165]: /100
          - generic [ref=e166]: 96.0%
          - generic [ref=e171]: 263 kW
          - generic [ref=e173]: "+3.1"
        - generic [ref=e178]:
          - generic [ref=e179]: "4"
          - generic [ref=e180]:
            - generic [ref=e181]: EV
            - generic [ref=e182]:
              - generic [ref=e183]: EVgo
              - generic [ref=e184]: CCS · CHAdeMO
          - generic [ref=e186]:
            - generic [ref=e187]: "82"
            - generic [ref=e188]: /100
          - generic [ref=e189]: 95.4%
          - generic [ref=e194]: 198 kW
          - generic [ref=e196]: "+0.4"
        - generic [ref=e201]:
          - generic [ref=e202]: "5"
          - generic [ref=e203]:
            - generic [ref=e204]: CP
            - generic [ref=e205]:
              - generic [ref=e206]: ChargePoint
              - generic [ref=e207]: CCS · J1772
          - generic [ref=e209]:
            - generic [ref=e210]: "80"
            - generic [ref=e211]: /100
          - generic [ref=e212]: 94.8%
          - generic [ref=e217]: 142 kW
          - generic [ref=e219]: "0.5"
        - generic [ref=e224]:
          - generic [ref=e225]: "6"
          - generic [ref=e226]:
            - generic [ref=e227]: S
            - generic [ref=e228]:
              - generic [ref=e229]: Shell Recharge
              - generic [ref=e230]: CCS · NACS
          - generic [ref=e232]:
            - generic [ref=e233]: "79"
            - generic [ref=e234]: /100
          - generic [ref=e235]: 95.1%
          - generic [ref=e240]: 176 kW
          - generic [ref=e242]: "+1.0"
        - generic [ref=e247]:
          - generic [ref=e248]: "7"
          - generic [ref=e249]:
            - generic [ref=e250]: BL
            - generic [ref=e251]:
              - generic [ref=e252]: Blink
              - generic [ref=e253]: CCS · J1772
          - generic [ref=e255]:
            - generic [ref=e256]: "71"
            - generic [ref=e257]: /100
          - generic [ref=e258]: 91.2%
          - generic [ref=e263]: 96 kW
          - generic [ref=e265]: "1.4"
      - generic [ref=e270]:
        - generic [ref=e271]: Composite Juice Score · sample data shown for design preview
        - link "See scoring methodology" [ref=e272] [cursor=pointer]:
          - /url: /about/methodology/
    - generic [ref=e276]:
      - generic [ref=e277]:
        - generic [ref=e278]:
          - text: Browse by location
          - heading "Explore by city." [level=2] [ref=e279]
          - paragraph [ref=e280]: Curated charging guides for metros across the Pacific Northwest and Mountain West — top-rated stations, local pricing, and where to actually find a free stall.
        - link "All cities" [ref=e281] [cursor=pointer]:
          - /url: /#cities
      - generic [ref=e284]:
        - link "Seattle 1,540 stations 300 fast Score 88 88" [ref=e285] [cursor=pointer]:
          - /url: /washington/city/seattle/
          - generic [ref=e288]:
            - generic [ref=e289]: Seattle
            - generic [ref=e290]:
              - generic [ref=e291]: 1,540 stations
              - generic [ref=e292]: 300 fast
              - generic [ref=e293]: Score 88
          - generic [ref=e294]: "88"
        - link "Portland 980 stations 210 fast Score 86 86" [ref=e295] [cursor=pointer]:
          - /url: /oregon/city/portland/
          - generic [ref=e298]:
            - generic [ref=e299]: Portland
            - generic [ref=e300]:
              - generic [ref=e301]: 980 stations
              - generic [ref=e302]: 210 fast
              - generic [ref=e303]: Score 86
          - generic [ref=e304]: "86"
        - link "Denver 1,110 stations 240 fast Score 83 83" [ref=e305] [cursor=pointer]:
          - /url: /colorado/city/denver/
          - generic [ref=e308]:
            - generic [ref=e309]: Denver
            - generic [ref=e310]:
              - generic [ref=e311]: 1,110 stations
              - generic [ref=e312]: 240 fast
              - generic [ref=e313]: Score 83
          - generic [ref=e314]: "83"
    - generic [ref=e316]:
      - generic [ref=e317]:
        - generic [ref=e318]:
          - text: Road trips, charged
          - heading "Plan a route with confidence." [level=2] [ref=e319]
          - paragraph [ref=e320]: Map a corridor end-to-end with verified fast-charging stops, real-time availability, and charge-time estimates for your car.
        - link "Browse all corridors" [ref=e321] [cursor=pointer]:
          - /url: /road-trips/
      - generic [ref=e324]:
        - generic [ref=e325]:
          - heading "Trip planner" [level=3] [ref=e326]
          - paragraph [ref=e327]: Plan a corridor end-to-end with verified fast-charging stops and charge-time estimates.
          - link "Browse all corridors" [ref=e328] [cursor=pointer]:
            - /url: /road-trips/
        - generic [ref=e329]:
          - link "I-90 Seattle → Spokane 279 mi · mountain pass · 9 fast stops 9 fast stops" [ref=e331] [cursor=pointer]:
            - /url: /washington/i-90/
            - generic [ref=e332]: I-90
            - generic [ref=e333]:
              - generic [ref=e334]: Seattle → Spokane
              - generic [ref=e335]: 279 mi · mountain pass · 9 fast stops
            - generic [ref=e336]:
              - generic [ref=e337]: "9"
              - generic [ref=e338]: fast stops
          - link "I-84 Portland → Boise 377 mi · Columbia River Gorge · 11 fast stops 11 fast stops" [ref=e340] [cursor=pointer]:
            - /url: /oregon/i-84/
            - generic [ref=e341]: I-84
            - generic [ref=e342]:
              - generic [ref=e343]: Portland → Boise
              - generic [ref=e344]: 377 mi · Columbia River Gorge · 11 fast stops
            - generic [ref=e345]:
              - generic [ref=e346]: "11"
              - generic [ref=e347]: fast stops
          - link "I-70 Denver → Grand Junction 244 mi · transmountain · 12 fast stops 12 fast stops" [ref=e349] [cursor=pointer]:
            - /url: /colorado/i-70/
            - generic [ref=e350]: I-70
            - generic [ref=e351]:
              - generic [ref=e352]: Denver → Grand Junction
              - generic [ref=e353]: 244 mi · transmountain · 12 fast stops
            - generic [ref=e354]:
              - generic [ref=e355]: "12"
              - generic [ref=e356]: fast stops
          - link "I-5 Portland → Eugene 165 mi · Willamette Valley · 7 fast stops 7 fast stops" [ref=e358] [cursor=pointer]:
            - /url: /oregon/i-5/
            - generic [ref=e359]: I-5
            - generic [ref=e360]:
              - generic [ref=e361]: Portland → Eugene
              - generic [ref=e362]: 165 mi · Willamette Valley · 7 fast stops
            - generic [ref=e363]:
              - generic [ref=e364]: "7"
              - generic [ref=e365]: fast stops
    - generic [ref=e366]:
      - generic [ref=e368]:
        - generic [ref=e369]:
          - text: Coverage map
          - heading "22,800+ stations. Zero guesswork." [level=2] [ref=e370]
          - paragraph [ref=e371]: Every public charging station across 12 states, scored on reliability — find the stall that actually works before you drive there.
        - link "Browse route maps" [ref=e372] [cursor=pointer]:
          - /url: /road-trips/
      - region "Station coverage map" [ref=e375]:
        - generic [ref=e376]:
          - paragraph [ref=e377]: Plate · 22,863 stations
          - generic [ref=e378]:
            - generic [ref=e379] [cursor=pointer]:
              - checkbox "DC fast only" [ref=e380]
              - generic [ref=e381]: DC fast only
            - combobox "Filter by state" [ref=e383] [cursor=pointer]:
              - option "All states" [selected]
              - option "AZ"
              - option "CO"
              - option "GA"
              - option "ID"
              - option "IL"
              - option "MA"
              - option "MT"
              - option "OR"
              - option "TX"
              - option "UT"
              - option "WA"
              - option "WY"
        - img "Map of EV charging stations across the United States" [ref=e384]
        - generic [ref=e385]:
          - generic [ref=e386]: DC fast (≥50 kW)
          - generic [ref=e388]: Level 2
          - generic [ref=e390]: Zoom in to expand clusters; click a point for station details.
    - generic [ref=e392]:
      - generic [ref=e394]:
        - text: Featured oases
        - heading "The top of the index." [level=2] [ref=e395]
        - paragraph [ref=e396]: Highest-scoring sites on record — real infrastructure, scored and verified. Sample showcase.
      - generic [ref=e397]:
        - article [ref=e398] [cursor=pointer]:
          - generic [ref=e399]:
            - img "Sunroot Oasis — Marfa, TX" [ref=e400]
            - generic [ref=e401]: Electrify America
            - generic [ref=e402]: "96.4"
          - generic [ref=e404]:
            - generic [ref=e405]:
              - heading "Sunroot Oasis" [level=3] [ref=e406]
              - generic [ref=e407]: "#1"
            - paragraph [ref=e408]: Marfa, TX
            - generic [ref=e409]:
              - generic [ref=e410]: 350 kW
              - generic [ref=e411]: 8 ports
              - generic [ref=e412]: DC fast
        - article [ref=e413] [cursor=pointer]:
          - generic [ref=e414]:
            - img "The Greenhouse — Portland, OR" [ref=e415]
            - generic [ref=e416]: Tesla Supercharger
            - generic [ref=e417]: "95.1"
          - generic [ref=e419]:
            - generic [ref=e420]:
              - heading "The Greenhouse" [level=3] [ref=e421]
              - generic [ref=e422]: "#2"
            - paragraph [ref=e423]: Portland, OR
            - generic [ref=e424]:
              - generic [ref=e425]: 250 kW
              - generic [ref=e426]: 12 ports
              - generic [ref=e427]: DC fast
        - article [ref=e428] [cursor=pointer]:
          - generic [ref=e429]:
            - img "Solaria Station — Palm Springs, CA" [ref=e430]
            - generic [ref=e431]: EVgo
            - generic [ref=e432]: "94.2"
          - generic [ref=e434]:
            - generic [ref=e435]:
              - heading "Solaria Station" [level=3] [ref=e436]
              - generic [ref=e437]: "#3"
            - paragraph [ref=e438]: Palm Springs, CA
            - generic [ref=e439]:
              - generic [ref=e440]: 200 kW
              - generic [ref=e441]: 6 ports
              - generic [ref=e442]: DC fast
      - generic [ref=e443]:
        - generic [ref=e444]:
          - text: Station detail pages
          - heading "Every stall, documented." [level=2] [ref=e445]
          - paragraph [ref=e446]: 22,800+ individual station pages with address, connectors, access hours, and field-verified intelligence.
        - link "Browse by state" [ref=e447] [cursor=pointer]:
          - /url: /washington/
      - generic [ref=e450]:
        - link "Union Station Garage Tesla Supercharger · 0.6 mi ★ 4.8 94 MAX SPEED 250 kW PRICE $0.41/kWh NACS 10 of 12 open Details" [ref=e451] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e452]:
            - generic [ref=e453]:
              - generic [ref=e454]: Union Station Garage
              - generic [ref=e455]: Tesla Supercharger · 0.6 mi
              - generic [ref=e456]: ★ 4.8
            - generic [ref=e457]: "94"
          - generic [ref=e458]:
            - generic [ref=e459]:
              - generic [ref=e460]: MAX SPEED
              - generic [ref=e461]: 250 kW
            - generic [ref=e462]:
              - generic [ref=e463]: PRICE
              - generic [ref=e464]: $0.41/kWh
          - generic [ref=e465]: NACS
          - generic [ref=e467]:
            - generic [ref=e468]: 10 of 12 open
            - generic [ref=e470]: Details
        - link "RiNo Fast Hub Electrify America · 1.4 mi ★ 4.4 87 MAX SPEED 350 kW PRICE $0.46/kWh CCS NACS 5 of 10 open Details" [ref=e473] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e474]:
            - generic [ref=e475]:
              - generic [ref=e476]: RiNo Fast Hub
              - generic [ref=e477]: Electrify America · 1.4 mi
              - generic [ref=e478]: ★ 4.4
            - generic [ref=e479]: "87"
          - generic [ref=e480]:
            - generic [ref=e481]:
              - generic [ref=e482]: MAX SPEED
              - generic [ref=e483]: 350 kW
            - generic [ref=e484]:
              - generic [ref=e485]: PRICE
              - generic [ref=e486]: $0.46/kWh
          - generic [ref=e487]:
            - generic [ref=e488]: CCS
            - generic [ref=e489]: NACS
          - generic [ref=e490]:
            - generic [ref=e491]: 5 of 10 open
            - generic [ref=e493]: Details
        - link "Cherry Creek DC EVgo · 2.1 mi ★ 4.2 83 MAX SPEED 200 kW PRICE $0.38/kWh CCS CHAdeMO 6 of 8 open Details" [ref=e496] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e497]:
            - generic [ref=e498]:
              - generic [ref=e499]: Cherry Creek DC
              - generic [ref=e500]: EVgo · 2.1 mi
              - generic [ref=e501]: ★ 4.2
            - generic [ref=e502]: "83"
          - generic [ref=e503]:
            - generic [ref=e504]:
              - generic [ref=e505]: MAX SPEED
              - generic [ref=e506]: 200 kW
            - generic [ref=e507]:
              - generic [ref=e508]: PRICE
              - generic [ref=e509]: $0.38/kWh
          - generic [ref=e510]:
            - generic [ref=e511]: CCS
            - generic [ref=e512]: CHAdeMO
          - generic [ref=e513]:
            - generic [ref=e514]: 6 of 8 open
            - generic [ref=e516]: Details
        - link "Capitol Hill Level 2 ChargePoint · 0.9 mi ★ 4.0 78 MAX SPEED 19 kW PRICE $0.29/kWh J1772 14 of 18 open Details" [ref=e519] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e520]:
            - generic [ref=e521]:
              - generic [ref=e522]: Capitol Hill Level 2
              - generic [ref=e523]: ChargePoint · 0.9 mi
              - generic [ref=e524]: ★ 4.0
            - generic [ref=e525]: "78"
          - generic [ref=e526]:
            - generic [ref=e527]:
              - generic [ref=e528]: MAX SPEED
              - generic [ref=e529]: 19 kW
            - generic [ref=e530]:
              - generic [ref=e531]: PRICE
              - generic [ref=e532]: $0.29/kWh
          - generic [ref=e533]: J1772
          - generic [ref=e535]:
            - generic [ref=e536]: 14 of 18 open
            - generic [ref=e538]: Details
        - link "Tech Center Supercharger Tesla Supercharger · 7.8 mi ★ 4.7 92 MAX SPEED 250 kW PRICE $0.42/kWh NACS 8 of 16 open Details" [ref=e541] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e542]:
            - generic [ref=e543]:
              - generic [ref=e544]: Tech Center Supercharger
              - generic [ref=e545]: Tesla Supercharger · 7.8 mi
              - generic [ref=e546]: ★ 4.7
            - generic [ref=e547]: "92"
          - generic [ref=e548]:
            - generic [ref=e549]:
              - generic [ref=e550]: MAX SPEED
              - generic [ref=e551]: 250 kW
            - generic [ref=e552]:
              - generic [ref=e553]: PRICE
              - generic [ref=e554]: $0.42/kWh
          - generic [ref=e555]: NACS
          - generic [ref=e557]:
            - generic [ref=e558]: 8 of 16 open
            - generic [ref=e560]: Details
        - link "Federal Recharge Shell Recharge · 3.2 mi ★ 4.1 80 MAX SPEED 180 kW PRICE $0.40/kWh CCS NACS 2 of 6 open Details" [ref=e563] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e564]:
            - generic [ref=e565]:
              - generic [ref=e566]: Federal Recharge
              - generic [ref=e567]: Shell Recharge · 3.2 mi
              - generic [ref=e568]: ★ 4.1
            - generic [ref=e569]: "80"
          - generic [ref=e570]:
            - generic [ref=e571]:
              - generic [ref=e572]: MAX SPEED
              - generic [ref=e573]: 180 kW
            - generic [ref=e574]:
              - generic [ref=e575]: PRICE
              - generic [ref=e576]: $0.40/kWh
          - generic [ref=e577]:
            - generic [ref=e578]: CCS
            - generic [ref=e579]: NACS
          - generic [ref=e580]:
            - generic [ref=e581]: 2 of 6 open
            - generic [ref=e583]: Details
    - generic [ref=e587]:
      - generic [ref=e588]:
        - generic [ref=e589]:
          - text: Learn
          - heading "Charge smarter." [level=2] [ref=e590]
          - paragraph [ref=e591]: Plain-English guides to connectors, charging speeds, pricing, and the etiquette nobody tells you about.
        - link "Browse all guides" [ref=e592] [cursor=pointer]:
          - /url: /guides/
      - generic [ref=e595]:
        - link "Connectors DC Fast Charging Explained What 350 kW really means, CCS vs. NACS vs. CHAdeMO, and why your battery rarely hits the headline number. 6 min read" [ref=e596] [cursor=pointer]:
          - /url: /guides/dc-fast-charging/
          - generic [ref=e597]: Connectors
          - heading "DC Fast Charging Explained" [level=3] [ref=e598]
          - paragraph [ref=e599]: What 350 kW really means, CCS vs. NACS vs. CHAdeMO, and why your battery rarely hits the headline number.
          - generic [ref=e600]: 6 min read
        - link "Cost What Does a Tesla Supercharger Cost? Current pricing per kWh, idle fees, and how Tesla Supercharger rates compare to Electrify America and EVgo. 5 min read" [ref=e602] [cursor=pointer]:
          - /url: /guides/tesla-supercharger-cost/
          - generic [ref=e603]: Cost
          - heading "What Does a Tesla Supercharger Cost?" [level=3] [ref=e604]
          - paragraph [ref=e605]: Current pricing per kWh, idle fees, and how Tesla Supercharger rates compare to Electrify America and EVgo.
          - generic [ref=e606]: 5 min read
        - link "Apps Best EV Charging Apps in 2026 Which app actually finds you an open stall, and which just shows you a map of plugs you already know about. 4 min read" [ref=e608] [cursor=pointer]:
          - /url: /guides/ev-charging-apps/
          - generic [ref=e609]: Apps
          - heading "Best EV Charging Apps in 2026" [level=3] [ref=e610]
          - paragraph [ref=e611]: Which app actually finds you an open stall, and which just shows you a map of plugs you already know about.
          - generic [ref=e612]: 4 min read
        - 'link "Compatibility Tesla Magic Dock: Can Non-Teslas Use It? Which Supercharger locations have Magic Dock adapters, which cars work, and what to expect when you pull up. 4 min read" [ref=e614] [cursor=pointer]':
          - /url: /guides/tesla-magic-dock/
          - generic [ref=e615]: Compatibility
          - 'heading "Tesla Magic Dock: Can Non-Teslas Use It?" [level=3] [ref=e616]'
          - paragraph [ref=e617]: Which Supercharger locations have Magic Dock adapters, which cars work, and what to expect when you pull up.
          - generic [ref=e618]: 4 min read
        - link "Free Where to Charge Your EV for Free Dealerships, hotels, grocery stores, and municipal lots where the plug costs you nothing. 5 min read" [ref=e620] [cursor=pointer]:
          - /url: /guides/free-ev-charging/
          - generic [ref=e621]: Free
          - heading "Where to Charge Your EV for Free" [level=3] [ref=e622]
          - paragraph [ref=e623]: Dealerships, hotels, grocery stores, and municipal lots where the plug costs you nothing.
          - generic [ref=e624]: 5 min read
    - generic [ref=e627]:
      - generic [ref=e629]:
        - text: Why The Juice Index
        - heading "Built for drivers, not networks." [level=2] [ref=e630]
      - generic [ref=e631]:
        - generic [ref=e632]:
          - heading "Independently scored" [level=3] [ref=e637]
          - paragraph [ref=e638]: We rank every network on measured reliability — never on who pays us. No sponsored placements, ever.
        - generic [ref=e639]:
          - heading "Field-verified" [level=3] [ref=e643]
          - paragraph [ref=e644]: Station pages include editorial field intelligence — amenities, cell signal, winter access — that the apps miss.
        - generic [ref=e645]:
          - heading "Backed by 14M+ sessions" [level=3] [ref=e649]
          - paragraph [ref=e650]: Scores are computed from millions of anonymized charging sessions — real outcomes, not spec sheets.
        - generic [ref=e651]:
          - heading "Price transparency" [level=3] [ref=e656]
          - paragraph [ref=e657]: Up-front $/kWh including idle and session fees, so the number you see is the number you pay.
    - generic [ref=e660]:
      - generic [ref=e661]:
        - text: The data
        - heading "Reliability, in the open." [level=2] [ref=e662]
        - paragraph [ref=e663]: "Every network plotted by the two things drivers feel most: how fast it actually charges, and how often it just works. Top-right is the sweet spot."
        - paragraph [ref=e664]: Bubble size reflects station count. Color reflects Juice Score tier. Sample data shown for design preview.
      - img "Network reliability scatter plot" [ref=e666]:
        - generic [ref=e667]: Tesla
        - generic [ref=e670]: Ionity
        - generic [ref=e673]: Electrify America
        - generic [ref=e676]: EVgo
        - generic [ref=e679]: ChargePoint
        - generic [ref=e682]: Shell Recharge
        - generic [ref=e685]: Blink
        - generic [ref=e688]: Avg delivered speed (kW)
        - generic [ref=e689]: Uptime (%)
    - generic [ref=e692]:
      - heading "More coverage, more states." [level=2] [ref=e693]
      - paragraph [ref=e694]: The Juice Index is expanding beyond the Pacific Northwest. New states, corridors, and station pages added regularly.
      - link "Plan your next trip" [ref=e695] [cursor=pointer]:
        - /url: /road-trips/
  - contentinfo [ref=e696]:
    - generic [ref=e697]:
      - generic [ref=e698]:
        - generic [ref=e699]:
          - link "The Juice Index" [ref=e700] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e705]: Every EV charger, ranked. Real-world reliability scores for 22,800+ stations across 12 states.
          - paragraph [ref=e706]: Data refreshed nightly from NREL AFDC.
        - generic [ref=e707]:
          - heading "Explore" [level=4] [ref=e708]
          - link "Find chargers" [ref=e709] [cursor=pointer]:
            - /url: /#find
          - link "Networks" [ref=e710] [cursor=pointer]:
            - /url: /networks/
          - link "Route planner" [ref=e711] [cursor=pointer]:
            - /url: /road-trips/
          - link "City guides" [ref=e712] [cursor=pointer]:
            - /url: /#cities
          - link "NEVI Tracker" [ref=e713] [cursor=pointer]:
            - /url: /nevi-tracker/
          - link "About" [ref=e714] [cursor=pointer]:
            - /url: /about/
          - link "Methodology" [ref=e715] [cursor=pointer]:
            - /url: /about/methodology/
        - generic [ref=e716]:
          - heading "Guides" [level=4] [ref=e717]
          - link "DC Fast Charging" [ref=e718] [cursor=pointer]:
            - /url: /guides/dc-fast-charging/
          - link "Tesla Supercharger Cost" [ref=e719] [cursor=pointer]:
            - /url: /guides/tesla-supercharger-cost/
          - link "Charging Apps" [ref=e720] [cursor=pointer]:
            - /url: /guides/ev-charging-apps/
          - link "Free EV Charging" [ref=e721] [cursor=pointer]:
            - /url: /guides/free-ev-charging/
          - link "Tesla Magic Dock" [ref=e722] [cursor=pointer]:
            - /url: /guides/tesla-magic-dock/
          - link "Rivian Charging" [ref=e723] [cursor=pointer]:
            - /url: /guides/rivian-charging/
          - link "Tesla Destination" [ref=e724] [cursor=pointer]:
            - /url: /guides/tesla-destination-charger/
          - link "NEVI Status Report" [ref=e725] [cursor=pointer]:
            - /url: /guides/nevi-build-out-q3-2026-status-report/
      - generic [ref=e726]:
        - generic [ref=e727]: © 2026 TheJuiceIndex.com
        - link "Sitemap" [ref=e728] [cursor=pointer]:
          - /url: /sitemap-index.xml
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import { isLenisActive } from './helpers'
  3  | 
  4  | test.describe('Feature 1 — Smooth inertial scrolling', () => {
  5  |   test('Lenis initializes on desktop with motion allowed', async ({ page }) => {
  6  |     await page.goto('/')
  7  |     await page.waitForLoadState('networkidle')
  8  | 
  9  |     // Lenis should be attached
  10 |     const hasLenis = await isLenisActive(page)
  11 |     expect(hasLenis).toBe(true)
  12 | 
  13 |     // html element carries .lenis class
  14 |     await expect(page.locator('html')).toHaveClass(/lenis/)
  15 |   })
  16 | 
  17 |   test('Anchor navigation still works', async ({ page }) => {
  18 |     await page.goto('/')
  19 |     await page.waitForLoadState('networkidle')
  20 | 
  21 |     // Click nav link to #templates
> 22 |     await page.click('a[href="#templates"]')
     |                ^ Error: page.click: Test timeout of 30000ms exceeded.
  23 | 
  24 |     // Wait for smooth scroll
  25 |     await page.waitForTimeout(1000)
  26 | 
  27 |     // URL hash should update
  28 |     expect(page.url()).toContain('#templates')
  29 |   })
  30 | 
  31 |   test('Lenis does not initialize on mobile', async ({ page }) => {
  32 |     // Mobile context (390x844)
  33 |     await page.goto('/')
  34 |     await page.waitForLoadState('networkidle')
  35 | 
  36 |     const hasLenis = await isLenisActive(page)
  37 |     expect(hasLenis).toBe(false)
  38 |   })
  39 | 
  40 |   test('Reduced motion disables Lenis', async ({ page }) => {
  41 |     // This test runs in the 'desktop-reduced' project context
  42 |     await page.goto('/')
  43 |     await page.waitForLoadState('networkidle')
  44 | 
  45 |     const hasLenis = await isLenisActive(page)
  46 |     expect(hasLenis).toBe(false)
  47 | 
  48 |     // Native browser scrolling should be used
  49 |     const scrollBehavior = await page.evaluate(() =>
  50 |       getComputedStyle(document.documentElement).scrollBehavior
  51 |     )
  52 |     expect(scrollBehavior).toBe('auto')
  53 |   })
  54 | })
  55 | 
```