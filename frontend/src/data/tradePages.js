/**
 * Trade pages — one record per NCVT trade Satpuda ITI runs.
 *
 * Every fact here is taken from the trade's official DGT competency-based
 * curriculum (the `source` on each record): duration, entry qualification,
 * NSQF level, hours, learning outcomes, tools, job roles and progression
 * pathways. Learning outcomes and tools are paraphrased only for length;
 * nothing is added that the curriculum does not list. Where these pages say
 * what a student learns, they describe the national trade — not a claim about
 * any one campus's workshop. Which Satpuda campus runs which trade comes from
 * the verified institute records (itiInstitutes.js), never from here.
 *
 * Retrieved from dgt.gov.in on 2026-09-28.
 */

import { tradeById } from './trades';

const CTS_LIST = 'https://dgt.gov.in/cts-details';

/** Assessment and certification rules common to every CTS trade. */
const PASS_RULE = '60% in trade practical and formative assessment, 33% in every other subject';

const ENGINEERING_ENTRY =
  'Passed 10th class with Science and Mathematics, or with a vocational subject in the same sector, or its equivalent';

const TECHNICIAN_LADDER = ['Technician', 'Senior Technician', 'Supervisor', 'Manager'];

export const tradePages = [
  // ---------------------------------------------------------------------------
  {
    id: 'electrician',
    name: 'Electrician',
    code: 'DGT/1001',
    kind: 'Engineering trade',
    sector: 'Power',
    theme: 'electric',
    hero: {
      lede:
        'Two years of hands-on training in wiring, earthing, electrical machines, transformers and power systems — from domestic installations to solar panels and EV charging stations.',
    },
    facts: {
      duration: 'Two years',
      years: 2,
      hours: '2,400 hrs + 300 hrs OJT',
      nsqf: 4,
      entry: ENGINEERING_ENTRY,
      entryShort: '10th with Science & Maths',
      minAge: 14,
    },
    structure: [
      { practical: 840, theory: 240, employability: 120, ojt: 150 },
      { practical: 840, theory: 300, employability: 60, ojt: 150 },
    ],
    overview: {
      intro:
        'The Electrician trade trains you to install, test, maintain and repair electrical wiring, machines and equipment safely. The first year covers safety, conductors, basic electrical laws, wiring, earthing, lighting, instruments and transformers; the second moves on to rotating machines, electronic control, power distribution and new energy systems.',
      photo: 'practicalWorkshop',
      photoCaption: 'Practical workshop session at Satpuda ITI',
      areas: [
        {
          icon: 'Zap',
          title: 'Electrical fundamentals',
          body: "Ohm's and Kirchhoff's laws, magnetism, and single- and three-phase circuits with balanced and unbalanced loads.",
        },
        {
          icon: 'Plug',
          title: 'Wiring & earthing',
          body: 'Wiring to IE rules for homes, hostels and workshops with MCBs, distribution boxes and energy meters; pipe and plate earthing.',
        },
        {
          icon: 'Gauge',
          title: 'Measurement & testing',
          body: 'Analog and digital instruments, meter calibration and range extension, and smart meters.',
        },
        {
          icon: 'Cog',
          title: 'Machines & transformers',
          body: 'Transformers, DC machines, induction motors, alternators and MG sets — testing, winding and overhaul.',
        },
        {
          icon: 'CircuitBoard',
          title: 'Electronics & control',
          body: 'Rectifiers, solid-state speed control of motors, control-cabinet wiring, UPS, inverters and stabilisers.',
        },
        {
          icon: 'Sun',
          title: 'Power & new energy',
          body: 'Solar panels, domestic service lines, circuit breakers and relays, smart grids and EV charging stations.',
        },
      ],
    },
    learn: [
      {
        label: 'First year',
        groups: [
          {
            icon: 'HardHat',
            title: 'Safety & joints',
            items: [
              'Prepare profiles to drawing, following safety precautions',
              'Make wire joints; solder, crimp and measure insulation resistance of underground cable',
            ],
          },
          {
            icon: 'Zap',
            title: 'Circuits & cells',
            items: [
              'Verify the characteristics of electrical and magnetic circuits',
              'Install, test and maintain batteries and solar cells',
            ],
          },
          {
            icon: 'Plug',
            title: 'Installation',
            items: [
              'Estimate, assemble, install and test wiring systems',
              'Plan and prepare earthing installations',
              'Plan, execute and test electrical illumination systems',
            ],
          },
          {
            icon: 'Gauge',
            title: 'Measurement',
            items: [
              'Measure with analog and digital instruments; install and diagnose smart meters',
              'Test instruments, verify errors and calibrate them',
            ],
          },
          {
            icon: 'Cog',
            title: 'Appliances & transformers',
            items: [
              'Install, find faults in and repair domestic appliances',
              'Test, evaluate and maintain transformers',
            ],
          },
        ],
      },
      {
        label: 'Second year',
        groups: [
          {
            icon: 'Cog',
            title: 'DC machines',
            items: [
              'Commission DC machines and evaluate their performance',
              'Test and maintain DC machines and motor starters',
            ],
          },
          {
            icon: 'RotateCw',
            title: 'AC motors & alternators',
            items: [
              'Commission, test and maintain AC motors and starters',
              'Test and maintain alternators and MG sets; run alternators in parallel',
              'Carry out motor winding',
            ],
          },
          {
            icon: 'CircuitBoard',
            title: 'Electronics & control',
            items: [
              'Assemble and test simple electronic circuits',
              'Wire control cabinets and their accessories',
              'Control the speed of AC and DC motors with solid-state devices',
              'Troubleshoot inverters, stabilisers, battery chargers, emergency lights and UPS',
            ],
          },
          {
            icon: 'Sun',
            title: 'Power & new energy',
            items: [
              'Plan, assemble and install solar panels',
              'Erect an overhead domestic service line; outline power plant layouts and the smart grid',
              'Find faults in and repair circuit breakers',
              'Install and troubleshoot electric vehicle charging stations',
            ],
          },
        ],
      },
    ],
    core: 'Engineering Drawing and Workshop Calculation & Science run through both years.',
    practice: {
      signature: 'sequence',
      title: 'From drawing to working installation.',
      lede: 'The DGT job description for an electrician reads as a sequence — the same one practical training follows.',
      steps: [
        { icon: 'FileText', title: 'Study the drawing', body: 'Read drawings and specifications to work out the circuit and installation details.' },
        { icon: 'Wrench', title: 'Install', body: 'Position and install motors, transformers, switchgear, switchboards, fittings and lighting.' },
        { icon: 'Cable', title: 'Connect', body: 'Make connections, solder terminals, draw wires and cables and do simple cable jointing.' },
        { icon: 'Gauge', title: 'Test', body: 'Test installations and equipment and locate faults using a megger, test lamps and meters.' },
        { icon: 'ShieldCheck', title: 'Repair & maintain', body: 'Replace defective wiring, fuses and parts, and keep fittings and machines in working order.' },
      ],
      tools: [
        {
          icon: 'Wrench',
          title: 'Hand tools',
          items: ['Insulated combination pliers', 'Neon tester (500 V)', 'Crimping tool', 'Soldering iron & desoldering gun', 'Hand and electric drills'],
        },
        {
          icon: 'Gauge',
          title: 'Measuring instruments',
          items: ['Digital multimeter', 'Ammeters & voltmeters', 'Wattmeters & energy meters', 'Power factor meter', 'Tachometer & lux meter'],
        },
        {
          icon: 'Cog',
          title: 'Machines',
          items: ['Transformers', 'DC machines', 'Three-phase induction motors', 'Alternators & MG sets', 'Motor starters & AC drives'],
        },
        {
          icon: 'Sun',
          title: 'Systems',
          items: ['MCBs & distribution boards', 'Pipe & plate earthing', 'Solar panels', 'UPS, inverters & battery chargers', 'Circuit breakers & relays'],
        },
      ],
    },
    careers: {
      roles: [
        {
          title: 'Electrician, General',
          nco: '7411.0100',
          body: 'Installs, maintains and repairs electrical machinery, equipment and fittings; tests installations and locates faults.',
        },
        {
          title: 'Electrical Fitter',
          nco: '7412.0200',
          body: 'Fits and assembles electrical machinery such as motors, transformers, generators, switchgear and fans, and erects panel boards and bus bars.',
        },
      ],
      settings: ['Factories', 'Workshops', 'Power houses', 'Business premises', 'Residential buildings'],
      settingsNote: 'Workplaces named in the DGT job description.',
    },
    pathway: {
      ladder: TECHNICIAN_LADDER,
      routes: [
        { icon: 'Handshake', title: 'Apprenticeship', body: 'Apprenticeship in industry, leading to the National Apprenticeship Certificate (NAC).' },
        { icon: 'GraduationCap', title: 'Diploma by lateral entry', body: 'Admission to diploma courses in notified engineering branches.' },
        { icon: 'BookOpen', title: '10+2 through NIOS', body: 'Higher secondary certificate through the National Institute of Open Schooling.' },
        { icon: 'Users', title: 'Become an instructor', body: 'Crafts Instructor Training Scheme (CITS) to teach the trade in ITIs.' },
        { icon: 'Award', title: 'Advanced Diploma (Vocational)', body: 'DGT advanced diploma courses, as applicable.' },
        { icon: 'Lightbulb', title: 'Entrepreneurship', body: 'Start your own work in the related field.' },
      ],
    },
    source: {
      label: 'DGT curriculum · Electrician · CTS 2.0 · revised July 2022',
      url: 'https://dgt.gov.in/sites/default/files/2024-01/Electrician_CTS2.0_NSQF-4.pdf',
    },
  },

  // ---------------------------------------------------------------------------
  {
    id: 'fitter',
    name: 'Fitter',
    code: 'DGT/1002',
    kind: 'Engineering trade',
    sector: 'Capital goods & manufacturing',
    theme: 'blueprint',
    hero: {
      lede:
        'Two years of precision bench work — marking, filing, drilling, fitting and assembling metal parts to tolerances as fine as ±0.02 mm — with lathe work, welding, pipe fitting, pneumatics, hydraulics and machine maintenance.',
    },
    facts: {
      duration: 'Two years',
      years: 2,
      hours: '2,400 hrs + 300 hrs OJT',
      nsqf: 4,
      entry: ENGINEERING_ENTRY,
      entryShort: '10th with Science & Maths',
      minAge: 14,
    },
    structure: [
      { practical: 840, theory: 240, employability: 120, ojt: 150 },
      { practical: 840, theory: 300, employability: 60, ojt: 150 },
    ],
    overview: {
      intro:
        'The Fitter trade trains you to size metal parts to close tolerances and fit and assemble them into working units, using hand tools, measuring instruments and machine tools. Skills build from simple to complex, and accuracy tightens step by step over the two years.',
      photo: 'garraWorkshop',
      photoCaption: 'Trainees at bench vices in a Satpuda ITI workshop',
      areas: [
        {
          icon: 'Ruler',
          title: 'Marking & measurement',
          body: 'Vernier callipers, micrometers, screw pitch gauges, surface plates, V-blocks and angle plates.',
        },
        {
          icon: 'Hammer',
          title: 'Basic fitting',
          body: 'Sawing, chiselling, filing, drilling, tapping and grinding — with safety, first aid and 5S from day one.',
        },
        {
          icon: 'Flame',
          title: 'Sheet metal & joining',
          body: 'Sheet metal work, soldering, brazing, riveting, and arc and gas (oxy-acetylene) welding.',
        },
        {
          icon: 'Crosshair',
          title: 'Precision fits & gauges',
          body: 'Sliding, T, step, dovetail and radius fits; scraping, lapping and honing; snap and gap gauges.',
        },
        {
          icon: 'Cog',
          title: 'Machines & transmission',
          body: 'Lathe operations, drill jigs, and repairing pulleys, gears, keys and shafts.',
        },
        {
          icon: 'Wind',
          title: 'Fluid power & maintenance',
          body: 'Pneumatic and hydraulic circuits, preventive maintenance, erecting simple machines and testing machine-tool accuracy.',
        },
      ],
    },
    learn: [
      {
        label: 'First year',
        groups: [
          {
            icon: 'Hammer',
            title: 'Basic fitting',
            hours: 195,
            items: ['Marking, hacksawing, chiselling, filing, drilling, tapping and grinding to ±0.25 mm, following safety precautions'],
          },
          {
            icon: 'Flame',
            title: 'Sheet metal, riveting & welding',
            hours: 315,
            items: [
              'Make simple sheet metal items and join them by soldering, brazing and riveting',
              'Join metal by riveting and by arc welding',
              'Cut and join metal by gas (oxy-acetylene, LPG or oxy-hydrogen)',
            ],
          },
          {
            icon: 'Crosshair',
            title: 'Precision operations & fits',
            hours: 330,
            items: [
              'Drill, ream, tap and die, checking with vernier, screw gauge and micrometer',
              'Make sliding, angular, step, T, square and profile fits to ±0.04 mm and 30 minutes',
            ],
          },
          {
            icon: 'Cog',
            title: 'Lathe & machine care',
            hours: 180,
            items: [
              'Face, turn, part, chamfer, groove, knurl, bore, taper-turn and thread on the lathe',
              'Repair and overhaul a drill machine, power saw, bench grinder and lathe',
            ],
          },
        ],
      },
      {
        label: 'Second year',
        groups: [
          {
            icon: 'Crosshair',
            title: 'Advanced fitting & gauges',
            hours: 465,
            items: [
              'Finish surfaces and fasten with dowels, screws, bolts, keys and cotters to ±0.02 mm and 10 minutes',
              'Make dovetail, radius and combined fits by scraping, lapping and honing',
              'Make snap and gap gauges to ±0.02 mm',
            ],
          },
          {
            icon: 'Wrench',
            title: 'Pipes & jigs',
            hours: 105,
            items: [
              'Cut, thread, flare, bend and join pipes; assemble valves and test for leaks',
              'Make a drill jig and produce components with it',
            ],
          },
          {
            icon: 'Wind',
            title: 'Power transmission & fluid power',
            hours: 285,
            items: [
              'Repair and assemble pulleys, gears, keys, jibs and shafts',
              'Dismantle and assemble compressors, pressure gauges, FRL units, valves and actuators',
              'Build pneumatic and hydraulic circuits',
            ],
          },
          {
            icon: 'Settings',
            title: 'Maintenance & erection',
            hours: 195,
            items: [
              'Carry out preventive maintenance and repair of simple machines',
              'Erect a simple machine and test machine-tool accuracy',
            ],
          },
        ],
      },
    ],
    core: 'Engineering Drawing and Workshop Science & Calculation run through both years, with two group projects.',
    practice: {
      signature: 'tolerance',
      title: 'Accuracy you can measure.',
      lede: 'The curriculum tightens the tolerance on every job as skills grow — the clearest picture of what two years of fitting builds.',
      stages: [
        { stage: 'Year 1 · Basic fitting', linear: '±0.25 mm', angular: null, width: 1, body: 'Marking, sawing, chiselling, filing, drilling and tapping.' },
        { stage: 'Year 1 · Fits', linear: '±0.04 mm', angular: '30′', width: 0.16, body: 'Sliding, angular, step, T, square and profile fits.' },
        { stage: 'Year 2 · Precision', linear: '±0.02 mm', angular: '10′', width: 0.08, body: 'Dovetail and radius fits, scraping, lapping, honing and gauges.' },
      ],
      steps: [
        { icon: 'FileText', title: 'Read the drawing', body: 'Understand the specification and function of each part.' },
        { icon: 'PenTool', title: 'Mark out', body: 'Use a surface plate, scriber, vernier height gauge, V-blocks and angle plate.' },
        { icon: 'Hammer', title: 'Cut & shape', body: 'Saw, chip, file, grind, drill, and cut threads with taps and dies.' },
        { icon: 'Ruler', title: 'Measure', body: 'Check with callipers, micrometer, vernier, dial indicator and gauges.' },
        { icon: 'Settings', title: 'Assemble & test', body: 'Fit parts with screws, rivets and pins and test the finished unit.' },
      ],
      tools: [
        {
          icon: 'Ruler',
          title: 'Marking & measuring',
          items: ['Steel rule & try square', 'Vernier calliper', 'Outside micrometers', 'Screw pitch gauge', 'Surface plate, V-blocks & angle plate'],
        },
        {
          icon: 'Hammer',
          title: 'Cutting & shaping',
          items: ['Hacksaw', 'Files — flat, half round, triangular, needle', 'Scrapers', 'Taps & dies', 'Twist drills'],
        },
        {
          icon: 'Cog',
          title: 'Machines',
          items: ['Drilling machine', 'Lathe', 'Power saw', 'Bench grinder', 'Portable electric drill'],
        },
        {
          icon: 'Flame',
          title: 'Joining & fluid power',
          items: ['Arc welding', 'Gas welding & cutting', 'Riveting, soldering & brazing', 'Pneumatic components', 'Hydraulic components'],
        },
      ],
    },
    careers: {
      roles: [
        {
          title: 'Fitter, General',
          nco: '7233.0100',
          body: 'Sizes metal parts to close tolerances and fits and assembles them for the production or repair of machines and other metal products.',
        },
        {
          title: 'Fitter, Bench',
          nco: '7233.0200',
          body: 'Hand fitting at the vice — cutting, filing, drilling and threading parts to size — the core of the curriculum’s Fitter job description.',
        },
      ],
      settings: ['Machine production', 'Machine repair & maintenance', 'Metal products', 'Pneumatic & hydraulic systems'],
      settingsNote: 'Work areas named in the DGT job description.',
    },
    pathway: {
      ladder: TECHNICIAN_LADDER,
      routes: [
        { icon: 'Handshake', title: 'Apprenticeship', body: 'Apprenticeship in industry, leading to the National Apprenticeship Certificate (NAC).' },
        { icon: 'GraduationCap', title: 'Diploma by lateral entry', body: 'Admission to diploma courses in notified engineering branches.' },
        { icon: 'BookOpen', title: '10+2 through NIOS', body: 'Higher secondary certificate through the National Institute of Open Schooling.' },
        { icon: 'Users', title: 'Become an instructor', body: 'Crafts Instructor Training Scheme (CITS) to teach the trade in ITIs.' },
        { icon: 'Award', title: 'Advanced Diploma (Vocational)', body: 'DGT advanced diploma courses, as applicable.' },
        { icon: 'Lightbulb', title: 'Entrepreneurship', body: 'Start your own work in the related field.' },
      ],
    },
    source: {
      label: 'DGT curriculum · Fitter · CTS 3.0 · revised August 2025',
      url: 'https://dgt.gov.in/sites/default/files/2026-08/Fitter_CTS3.0_NSQF-4.pdf',
    },
  },

  // ---------------------------------------------------------------------------
  {
    id: 'mechanic-diesel',
    name: 'Mechanic Diesel',
    code: 'DGT/1006',
    kind: 'Engineering trade',
    sector: 'Automotive',
    theme: 'engine',
    hero: {
      lede:
        'One year of hands-on training on the diesel engines of light and heavy motor vehicles — dismantling, overhauling and testing engines, and servicing their cooling, lubrication, fuel and electrical systems.',
    },
    facts: {
      duration: 'One year',
      years: 1,
      hours: '1,200 hrs + 150 hrs OJT',
      nsqf: 3,
      entry: ENGINEERING_ENTRY,
      entryShort: '10th with Science & Maths',
      minAge: 14,
    },
    structure: [{ practical: 840, theory: 240, employability: 120, ojt: 150 }],
    overview: {
      intro:
        'Mechanic Diesel trains you to repair, service and overhaul diesel engines so they perform efficiently as prime movers for vehicles and machinery. Workshop fundamentals come first — measuring, fitting, welding, electrics — and then the engine itself, system by system, on light and heavy motor vehicles.',
      photo: null,
      areas: [
        {
          icon: 'Ruler',
          title: 'Measuring & marking',
          body: 'Micrometers, telescope and dial bore gauges, dial indicators, feeler, thread pitch and vacuum gauges.',
        },
        {
          icon: 'Wrench',
          title: 'Fitting & welding',
          body: 'Fastening and fitting with hand and machine tools; joining with arc and gas welding.',
        },
        {
          icon: 'BatteryCharging',
          title: 'Auto electrical',
          body: 'Electrical and electronic circuits, vehicle batteries, starter motors and alternators.',
        },
        {
          icon: 'Cog',
          title: 'Engine overhaul',
          body: 'Cylinder head, valve train, pistons, connecting rods, crankshaft, flywheel and camshaft.',
        },
        {
          icon: 'Fuel',
          title: 'Fuel & emission',
          body: 'Diesel fuel system, fuel injection pump, injectors and governor; emission checks against norms.',
        },
        {
          icon: 'Activity',
          title: 'Diagnosis',
          body: 'Tracing and rectifying defects in light and heavy motor vehicles.',
        },
      ],
    },
    learn: [
      {
        label: 'One year',
        groups: [
          {
            icon: 'Ruler',
            title: 'Workshop foundations',
            items: [
              'Measure and mark with vernier, micrometer, bore gauges, dial indicator and feeler gauge',
              'Fasten and fit with the correct hand and machine tools',
              'Join components by arc and gas welding',
            ],
          },
          {
            icon: 'BatteryCharging',
            title: 'Electrics, hydraulics & the vehicle',
            items: [
              'Trace and test electrical and electronic circuits; charge and test batteries',
              'Trace and test hydraulic and pneumatic components',
              'Read vehicle specification data and the VIN; use service-station equipment',
            ],
          },
          {
            icon: 'Cog',
            title: 'Engine overhaul',
            items: [
              'Remove and refit a diesel engine from an LMV or HMV, using correct torqueing',
              'Overhaul, service and test the engine and its parts',
              'Overhaul a stationary engine and its governor',
            ],
          },
          {
            icon: 'Thermometer',
            title: 'Engine systems',
            items: [
              'Trace, test and repair the cooling and lubrication systems',
              'Trace and test intake and exhaust, including cleaning EGR valves and manifolds',
              'Service the fuel system — calibrate mechanical and electronic pumps, check injectors and filters',
              'Overhaul the alternator and starter motor',
            ],
          },
          {
            icon: 'Activity',
            title: 'Emission & diagnosis',
            items: [
              'Monitor vehicle emission and adjust to meet emission norms',
              'Diagnose and rectify defects in light and heavy motor vehicles',
            ],
          },
        ],
      },
    ],
    core: 'Engineering Drawing and Workshop Calculation & Science are part of the year.',
    practice: {
      signature: 'engine',
      title: 'Inside the engine, system by system.',
      lede: 'Choose a system to see what the curriculum trains you to do on it, and the workshop equipment it lists for the job.',
      systems: [
        {
          id: 'overhaul',
          label: 'Engine overhaul',
          body: 'Dismantle and reassemble the engine in sequence — cylinder head, valve train, pistons, connecting rods, crankshaft and camshaft — then test it.',
          tools: ['Torque wrench', 'Valve spring compressor', 'Cylinder bore gauge', 'Compression testing gauge'],
        },
        {
          id: 'fuel',
          label: 'Fuel system',
          body: 'Service the diesel fuel system: calibrate mechanical and electronic pumps, check injectors and filters, and overhaul the governor.',
          tools: ['Injector testing set', 'Injector cleaning unit', 'CRDI diesel engine'],
        },
        {
          id: 'cooling',
          label: 'Cooling & lubrication',
          body: 'Trace, test and repair the cooling and lubrication systems, choosing the right coolants and oils for the engine.',
          tools: [],
        },
        {
          id: 'air',
          label: 'Intake & exhaust',
          body: 'Trace and test the intake and exhaust system, clean EGR valves, ports and manifolds, and bring emission within norms.',
          tools: ['Automotive diesel smoke meter'],
        },
        {
          id: 'electrical',
          label: 'Starting & charging',
          body: 'Overhaul the alternator and starter motor, and charge and test vehicle batteries.',
          tools: ['Battery charger', 'Glow plug tester', 'Digital multimeter'],
        },
      ],
      steps: [
        { icon: 'Search', title: 'Examine', body: 'Locate defects using tools and instruments.' },
        { icon: 'Wrench', title: 'Dismantle', body: 'Remove damaged or worn parts; repair or replace them.' },
        { icon: 'Settings', title: 'Assemble', body: 'Grind valves and assemble parts to an accurate fit.' },
        { icon: 'Gauge', title: 'Tune & observe', body: 'Start the engine and set it to standard by temperature, fuel and oil-pressure readings.' },
        { icon: 'ShieldCheck', title: 'Maintain', body: 'Check, adjust and lubricate to keep the engine in good order.' },
      ],
      tools: [
        {
          icon: 'Ruler',
          title: 'Measuring',
          items: ['Vernier calliper & micrometers', 'Telescope & dial bore gauges', 'Dial indicator', 'Feeler & thread pitch gauges', 'Vacuum & tyre pressure gauges'],
        },
        {
          icon: 'Wrench',
          title: 'Workshop tools',
          items: ['Torque wrenches', 'Air impact wrench', 'Universal puller', 'Valve spring compressor', 'Lifting jacks'],
        },
        {
          icon: 'Gauge',
          title: 'Testing equipment',
          items: ['Compression testing gauge', 'Injector testing set', 'Glow plug tester', 'Diesel smoke meter', 'Battery charger'],
        },
        {
          icon: 'Truck',
          title: 'Engines & vehicles',
          items: ['Multi-cylinder diesel engines', 'CRDI four-stroke engine', 'Cut-section engine', 'Light & heavy motor vehicles'],
        },
      ],
    },
    careers: {
      roles: [
        {
          title: 'Mechanic, Diesel Engine',
          nco: '7233.0400',
          body: 'Repairs, services and overhauls diesel engines used as prime movers for vehicles, machinery and equipment; tunes engines and services fuel pumps and injectors.',
        },
      ],
      settings: ['Light motor vehicles', 'Heavy motor vehicles', 'Stationary engines', 'Diesel-driven machinery'],
      settingsNote: 'Engines and vehicles the curriculum trains on.',
    },
    pathway: {
      ladder: TECHNICIAN_LADDER,
      routes: [
        { icon: 'Handshake', title: 'Apprenticeship', body: 'Apprenticeship in industry, leading to the National Apprenticeship Certificate (NAC).' },
        { icon: 'Users', title: 'Become an instructor', body: 'Crafts Instructor Training Scheme (CITS) to teach the trade in ITIs.' },
        { icon: 'Award', title: 'Advanced Diploma (Vocational)', body: 'DGT advanced diploma courses, as applicable.' },
        { icon: 'Lightbulb', title: 'Entrepreneurship', body: 'Start your own work in the related field.' },
      ],
    },
    source: {
      label: 'DGT curriculum · Mechanic Diesel · CTS 2.0 · revised July 2022',
      url: 'https://dgt.gov.in/sites/default/files/Mechanic%20Diesel_CTS2.0_NSQF-3.pdf',
    },
  },

  // ---------------------------------------------------------------------------
  {
    id: 'copa',
    name: 'COPA',
    fullName: 'Computer Operator & Programming Assistant',
    code: 'DGT/1003',
    kind: 'Non-engineering trade',
    sector: 'IT & ITeS',
    theme: 'digital',
    hero: {
      lede:
        'One year of practical computer training — operating systems, office applications, databases, networking, web pages with HTML, CSS and JavaScript, cyber security, cloud and AI tools, and programming in Python.',
    },
    facts: {
      duration: 'One year',
      years: 1,
      hours: '1,200 hrs + 150 hrs OJT',
      nsqf: 3.5,
      entry: 'Passed 10th class examination',
      entryShort: '10th pass',
      minAge: 14,
    },
    structure: [{ practical: 840, theory: 240, employability: 120, ojt: 150 }],
    overview: {
      intro:
        'COPA trains you to operate computers and their peripherals, work confidently with office software and data, set up and secure networks, and write programs and web pages. It is a non-engineering trade in the IT & ITeS sector, with project work and on-the-job training built into the year.',
      photo: null,
      areas: [
        {
          icon: 'Monitor',
          title: 'Computer systems',
          body: 'Peripherals and internal components, DOS and PowerShell commands, installing operating systems and software.',
        },
        {
          icon: 'FileSpreadsheet',
          title: 'Office applications',
          body: 'Documents, presentations and spreadsheets — up to macros, charts and pivot tables.',
        },
        {
          icon: 'Database',
          title: 'Databases',
          body: 'Creating and managing database files with MySQL.',
        },
        {
          icon: 'Network',
          title: 'Networks & Internet',
          body: 'Setting up, configuring, troubleshooting and securing networks; e-commerce and online communication.',
        },
        {
          icon: 'Code',
          title: 'Web & programming',
          body: 'Algorithms and flowcharts, web pages in HTML, CSS and JavaScript, hosting on a domain, and Python.',
        },
        {
          icon: 'Shield',
          title: 'Cloud, security & AI',
          body: 'Cloud services, the application development life cycle, cyber security and using AI in everyday work.',
        },
      ],
    },
    learn: [
      {
        label: 'One year',
        groups: [
          {
            icon: 'Monitor',
            title: 'Computer systems',
            hours: 120,
            items: ['Install and set up an operating system and related software, following safety precautions'],
          },
          {
            icon: 'FileSpreadsheet',
            title: 'Office applications',
            hours: 300,
            items: [
              'Create, format and edit documents in a word processor',
              'Create and customise presentation slides',
              'Build spreadsheets, then advanced workbooks with formulae, macros, charts and pivot tables',
            ],
          },
          {
            icon: 'Database',
            title: 'Data & networks',
            hours: 150,
            items: [
              'Create and manage database files with MySQL',
              'Install, configure, troubleshoot and secure a computer network, including the Internet',
            ],
          },
          {
            icon: 'Code',
            title: 'Web development',
            hours: 300,
            items: ['Develop web pages with HTML and CSS', 'Develop dynamic web pages with JavaScript'],
          },
          {
            icon: 'Shield',
            title: 'Digital world',
            hours: 120,
            items: [
              'Browse, select and transact on e-commerce websites',
              'Explain cloud services and the application development life cycle',
              'Secure information on the Internet with cyber security concepts',
              'Integrate AI with different applications',
            ],
          },
          {
            icon: 'Terminal',
            title: 'Programming',
            hours: 90,
            items: ['Write programs in Python'],
          },
        ],
      },
    ],
    core: 'Employability Skills run alongside the trade; project work and industrial visits are part of the year.',
    practice: {
      signature: 'stack',
      title: 'Where the year’s practical hours go.',
      lede: 'Each module’s practical and theory hours, as the curriculum allots them — web development and office software take the largest share.',
      modules: [
        { label: 'Operating system & software', practical: 90, theory: 30 },
        { label: 'Word processing', practical: 50, theory: 10 },
        { label: 'Presentations', practical: 50, theory: 10 },
        { label: 'Spreadsheets', practical: 70, theory: 20 },
        { label: 'Advanced spreadsheets', practical: 70, theory: 20 },
        { label: 'MySQL databases', practical: 50, theory: 10 },
        { label: 'Networking & Internet', practical: 70, theory: 20 },
        { label: 'HTML & CSS', practical: 70, theory: 20 },
        { label: 'JavaScript', practical: 170, theory: 40 },
        { label: 'E-commerce', practical: 20, theory: 10 },
        { label: 'Cloud & app life cycle', practical: 20, theory: 10 },
        { label: 'Cyber security', practical: 20, theory: 10 },
        { label: 'AI integration', practical: 20, theory: 10 },
        { label: 'Python', practical: 70, theory: 20 },
      ],
      tools: [
        {
          icon: 'Monitor',
          title: 'Hardware',
          items: ['Desktop computers', 'Laptop', 'All-in-one printer', 'Web cameras', 'Smart interactive board', 'Online UPS'],
        },
        {
          icon: 'Network',
          title: 'Networking',
          items: ['Wi-Fi router', '24-port switch & patch panel', 'Structured cabling', 'RJ-45 crimping & punching tools', 'LAN tester'],
        },
        {
          icon: 'AppWindow',
          title: 'Software',
          items: ['Office automation software', 'Open-source office suite', 'Python', 'GIMP', 'Antivirus'],
        },
        {
          icon: 'Globe',
          title: 'Internet & web',
          items: ['Broadband connectivity', 'Registered domain with web space', 'Web browsers'],
        },
      ],
    },
    careers: {
      roles: [
        {
          title: 'Computer Operator',
          nco: '4131.0600',
          body: 'Operates computers and peripheral equipment to process business, scientific, engineering or other data.',
        },
        {
          title: 'Programming Assistant',
          nco: '3514.0300',
          body: 'Installs, maintains and updates computer programs under the guidance of computing professionals.',
        },
        {
          title: 'Web Developer',
          nco: '2513.0101',
          body: 'Designs and maintains web applications with static and dynamic content — layout, design and coding.',
        },
        {
          title: 'User Interface Developer',
          nco: '2513.0201',
          body: 'Builds user interfaces for applications, databases and websites.',
        },
        {
          title: 'Network Administrator',
          nco: '2523.0100',
          body: 'Tests, evaluates and supports data-communication hardware and software, and helps users solve network problems.',
        },
      ],
      settings: ['Business data processing', 'Scientific & engineering data', 'Web & application teams', 'Network support'],
      settingsNote: 'Work areas named in the DGT job descriptions.',
    },
    pathway: {
      ladder: ['Computer Operator', 'Assistant Programmer', 'Programmer', 'Senior Programmer'],
      routes: [
        { icon: 'Handshake', title: 'Apprenticeship', body: 'Apprenticeship in industry, leading to the National Apprenticeship Certificate (NAC).' },
        { icon: 'Users', title: 'Become an instructor', body: 'Crafts Instructor Training Scheme (CITS) to teach the trade in ITIs.' },
        { icon: 'Award', title: 'Advanced Diploma (Vocational)', body: 'DGT advanced diploma courses, as applicable.' },
        { icon: 'Lightbulb', title: 'Entrepreneurship', body: 'Start your own work in the related field.' },
      ],
    },
    source: {
      label: 'DGT curriculum · COPA · CTS 3.0 · revised August 2025',
      url: 'https://dgt.gov.in/sites/default/files/2026-08/COPA_CTS3.0_NSQF-3.5.pdf',
    },
  },
].map((t) => {
  const record = tradeById[t.id];
  return {
    ...t,
    slug: `/trades/${t.id}`,
    // Verified Satpuda campuses that publish this trade.
    campuses: record?.campuses ?? [],
    faqs: faqsFor(t),
    passRule: PASS_RULE,
    ctsList: CTS_LIST,
  };
});

/** Answers are assembled from the record so they can never disagree with it. */
function faqsFor(t) {
  const perYear = t.structure[0];
  const instruction = t.structure.reduce((n, y) => n + y.practical + y.theory + y.employability, 0);
  const ojt = t.structure.reduce((n, y) => n + y.ojt, 0);
  const lateral = t.pathway.routes.some((r) => r.title === 'Diploma by lateral entry');
  const campuses = tradeById[t.id]?.campuses ?? [];

  return [
    {
      q: `How long is the ${t.name} course?`,
      a: `${t.facts.duration}: ${instruction.toLocaleString('en-IN')} hours of instruction plus ${ojt} hours of on-the-job training or group project${
        t.structure.length > 1 ? `, ${perYear.ojt} hours in each year` : ''
      }.`,
    },
    {
      q: 'What qualification do I need?',
      a: `${t.facts.entry}. The minimum age is ${t.facts.minAge} years on the first day of the academic session.`,
    },
    {
      q: 'Is the training mostly practical?',
      a: `Yes. ${perYear.practical.toLocaleString('en-IN')} of every ${(perYear.practical + perYear.theory + perYear.employability).toLocaleString('en-IN')} training hours are trade practical. There is also ${perYear.ojt} hours of on-the-job training each year at nearby industry — or a group project where industry is not available.`,
    },
    {
      q: 'What certificate will I get?',
      a: `After passing the All India Trade Test conducted by DGT you are awarded the National Trade Certificate (NTC). To pass you need ${PASS_RULE}.`,
    },
    {
      q: 'What jobs can I apply for?',
      a: `The curriculum's job roles are ${t.careers.roles.map((r) => r.title).join(', ')}.`,
    },
    {
      q: 'Can I do an apprenticeship after ITI?',
      a: 'Yes. The curriculum lists apprenticeship in industry as a progression pathway, leading to the National Apprenticeship Certificate (NAC).',
    },
    {
      q: 'Can I continue my education after this trade?',
      a: lateral
        ? 'Yes. The curriculum lists diploma courses in notified engineering branches by lateral entry, the 10+2 examination through NIOS, the Crafts Instructor Training Scheme (CITS) and DGT Advanced Diploma (Vocational) courses.'
        : 'Yes. The curriculum lists the Crafts Instructor Training Scheme (CITS) and DGT Advanced Diploma (Vocational) courses. During the course you can also take optional courses of up to 240 hours a year towards a 10th or 12th certificate through NIOS.',
    },
    {
      q: `Which Satpuda campuses offer ${t.name}?`,
      a: campuses.length
        ? `${t.name} is offered at ${campuses.map((c) => c.shortName).join(', ')}. Please call the campus for current seats and admission dates.`
        : 'Please contact the head office for the campuses running this trade this session.',
    },
  ];
}

export const tradePageById = Object.fromEntries(tradePages.map((t) => [t.id, t]));
