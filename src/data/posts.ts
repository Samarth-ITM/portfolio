export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  // optional rich body as array of paragraphs (string or {quote: string})
  body?: Array<
    | string
    | { type: "quote"; text: string }
    | { type: "image"; src: string; alt: string }
    | { type: "sign"; text: string }
  >;
};

export const posts: Post[] = [
  {
    slug: "2026-05-05/leaky-abstractions",
    title: "Leaky Abstractions",
    date: "2026-05-05",
    excerpt:
      "Software is principally concerned with abstractions. Instead of writing binary, we have programming languages that abstract away the machine readable details. Instead of repeating thousands of lines of code to perform some action, we abstract the action as a…",
    body: [
      "Software is principally concerned with abstractions. Instead of writing binary, we have programming languages that abstract away the machine-readable details. Instead of repeating thousands of lines of code to perform some action, we abstract the action as a single function that represents our intent. We are masters of reducing complexity to composable primitives. Abstraction boundaries in software are clean because they are designed to be that way.",
      "The AI gold rush created enormous demand for software across domains that had long resisted automation. Investors and institutions responded by funding multidisciplinary teams of engineers and domain experts. They have no shortage of technical competence, healthy budgets, and viable development timelines, yet they struggle to produce systems that meaningfully reduce complexity in their target domains. Why?",
      "In medicine, abstractions are discovered after the fact, then imposed on a physical system that never agreed to honor them. This fantastic prospect of reducing something as complex as medical diagnosis into a single, neatly-packaged function is too attractive for startups and Fortune 500s alike to ignore. However, increased investment in such systems has done little more than demonstrate how poorly medicine compresses into clean software abstractions.",
      "Spolsky's Law of Leaky Abstractions elegantly captures the root of the problem:",
      { type: "quote", text: "All non-trivial abstractions, to some degree, are leaky." },
      'This "leaky behavior" represents exceptions to the rules, and is by no means limited to software. Analogous mental tools in medicine take the form of heuristics. For example, a patient complains of substernal chest pain, and heuristics dictate this alone justifies a work-up for myocardial infarction. A patient complains of a breast lump and histology reveals a compressed, slit-like duct — you start thinking about fibroadenoma. These are powerful shortcuts in and of themselves, but they don\'t capture the full nuance. In fact, medical heuristics are especially leaky. The suspected MI? It ended up being costochondritis. That suspected fibroadenoma? It may instead be benign stromal proliferation, with the biopsy sampling just enough compressed duct to suggest the wrong pattern and not enough of the surrounding architecture to reveal the process.',
      "Culturally, medicine and software have radically different attitudes towards abstractions. The leaky behavior in software represents problems that can be solved with more honest mental models. When heuristics fail in medicine, the solution isn't usually to engineer superior replacements. Rather, clinicians accept that they're dealing with an exception and act accordingly. New heuristics that cover edge cases pop up, but they tend to be divorced from the underlying pattern that motivated the original rule. A clinician may learn one heuristic for chest pain, another for atypical presentation in diabetics, another for women, another for elderly patients, another for cocaine use, another for normal initial troponin, and so on. These are not always cleanly composed into a single elegant model. They are operational patches over an incompletely observable system.",
      'At some point, the "how" or "why" takes a back seat to a clinician\'s mere ability to recognize and act appropriately. This reality is in conflict with my engineering mind\'s tendency to claw for beautifully composed abstractions capable of being followed down to the mechanisms.',
      'It is not a matter of rigor. Medicine\'s rich scientific edifice simply doesn\'t save it from being more of an engineering discipline. I mean engineering in the older sense: bounded decisions under uncertainty, with incomplete measurements, noisy instruments, resource constraints, and failure modes imposed by the physical world. With respect to "abstraction resistance", the mental experience of clinical medicine has more in common with electrical or FPGA engineering than software. This isn\'t all that surprising given that it deals with a physical system. What is surprising is how much difficulty software engineers — myself included — have in coming to terms with it.',
      "Rest assured this disconnect isn't going anywhere, at least not soon. If it took me multiple years of formal medical education to appreciate the nature (and magnitude) of the problem, I can't assume such an epiphany is imminent for most software engineers.",
      "This does not mean medical AI is doomed. It means the useful systems will be the ones that respect the leaks. They will surface uncertainty, preserve context, expose provenance, defer to domain constraints, and help clinicians navigate complexity rather than pretending to erase it. The fantasy is a function called diagnose(patient). The opportunity is software that makes the clinician's incomplete, time-constrained reasoning more visible, testable, and humane.",
      { type: "sign", text: "—Tom" },
    ],
  },
  {
    slug: "2026-03-05/on-living-with-yourself",
    title: "On Living with Yourself",
    date: "2026-03-05",
    excerpt:
      "When I was growing up, many of my friends' parents worked in aerospace and defense. Later, when I entered the software industry, many of my peers followed the same path. Their salaries were almost always higher than mine. I had, and still have, many friends w…",
  },
  {
    slug: "2026-02-28/eosin-v-the-registry",
    title: "Eosin V: The Registry",
    date: "2026-02-28",
    excerpt:
      "Modern omics workflows require pulling thousands of files from dozens of vendors, each with their own identifiers and formats. We solve this by treating every external resource as a vendor artifact, unified by a consistent OCI like interface. Artifacts Here w…",
  },
  {
    slug: "2026-02-25/how-i-accidentally-became-an-infrastructure-engineer",
    title: "How I Accidentally Became an Infrastructure Engineer",
    date: "2026-02-25",
    excerpt:
      "Circa 2018 I was working on R&D for my employer's medical device product. AI was integral to the platform, and that project fell in my lap. Back then, nothing in the ML stack worked unless you were willing to get your hands dirty. If you were serious about ML…",
  },
  {
    slug: "2026-02-24/eosin-iv-emergent-systems",
    title: "Eosin IV: Emergent Systems",
    date: "2026-02-24",
    excerpt:
      "Lately I've been thinking about why machine learning with biological data feels harder than it should. The research moves slowly not because scientists lack ideas, but because the infrastructure around data is fractured. Every archive, every consortium, every…",
  },
  {
    slug: "2026-02-23/cyto-vendor-examples",
    title: "Cyto Vendor Examples",
    date: "2026-02-23",
    excerpt:
      "I've ended up writing a fair amount of code to poke at different public bioinformatics APIs: GDC, GTEx, UCSC, ENA, PDB, gnomAD, and a few others. I needed to answer questions like: What do these endpoints actually return? Are their IDs stable? What does the e…",
  },
  {
    slug: "2026-02-22/eosin-iii-ecosystem-holes",
    title: "Eosin III: Ecosystem Holes",
    date: "2026-02-22",
    excerpt:
      "For more than a decade, digital pathology has suffered from a strange paradox: a landscape full of powerful individual tools, but almost no cohesive ecosystem. Each project solves one slice of the computational pathology workflow, but none of them span the co…",
  },
  {
    slug: "2026-02-21/eosin-ii-towards-a-unified-standard",
    title: "Eosin II: Towards a Unified Standard",
    date: "2026-02-21",
    excerpt:
      "Digital pathology has quietly fallen decades behind every other data intensive field. Despite the enormous clinical and research value locked inside whole slide imaging, the surrounding software ecosystem looks more like a collection of isolated experiments t…",
  },
  {
    slug: "2026-02-20/eosin-i-origins",
    title: "Eosin I: Origins",
    date: "2026-02-20",
    excerpt:
      "In the summer of 2025, I had the privilege of working in my school's research lab as a fellow. One of the professors there was leading a project that relied heavily on microscopy, and her research fellows produced textbook beautiful tissue slides. I'd often p…",
  },
  {
    slug: "2026-02-15/my-basic-advice",
    title: "My Basic Advice",
    date: "2026-02-15",
    excerpt:
      "A few times a week I receive an email from an approximately 20 year old developer currently enrolled in college or planning to be shortly. Sometimes they are interested in biomedical, but most express a desire to enter a cross domain STEM field with software…",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
