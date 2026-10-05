export type BlogImage = {
  src: string;
  alt: string;
};

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "gallery"; images: BlogImage[] }
  | { type: "figure"; image: BlogImage };

export type BlogAuthor = {
  name: string;
  role: string;
  image: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  image: string;
  alt: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: BlogAuthor;
  blocks: BlogBlock[];
};

export const BLOG_PAGE = {
  eyebrow: "Beyond the Interface",
  titleLead: "Perspectives on Design,",
  titleRest: "Technology & Growth",
  description:
    "Essays on design, technology, and the decisions that shape how products grow.",
};

const AUTHOR: BlogAuthor = {
  name: "Sha Arian",
  role: "Product Designer",
  image: "/team/aryan.jpg",
};

const SCREENS: BlogImage[] = [
  {
    src: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80",
    alt: "A product interface arranged on a laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    alt: "Charts and product metrics on a screen",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    alt: "Interface details on a computer display",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "infinite-scroll-ux",
    title:
      "How Infinite Scroll Can Hurt UX and Cost E-Commerce Businesses Millions of Dollars",
    image:
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=1600&q=80",
    alt: "A person studying a long stream of content on a desktop monitor",
    excerpt:
      "Endless feeds feel effortless until shoppers lose their place, miss the footer, and abandon a cart they cannot find again.",
    date: "18 Mar 2026",
    readTime: "8 min read",
    author: AUTHOR,
    blocks: [
      {
        type: "paragraph",
        text: "Endless feeds feel effortless until shoppers lose their place, miss the footer, and abandon a cart they cannot find again. Infinite scroll works when the next item is the product. On a store, it often hides the path to checkout.",
      },
      {
        type: "paragraph",
        text: "The pattern arrived from social products, where the job is to keep someone looking. A shop has a different job. People come to compare, return to a shortlist, and finish. A page that never ends makes each of those steps harder than it needs to be.",
      },
      {
        type: "heading",
        text: "Where the scroll stops being helpful",
      },
      {
        type: "paragraph",
        text: "The first screen of a catalog can feel generous. More products appear without a click, and the page stays quiet. The trouble starts after the second or third load, when the footer, filters, and recently viewed items have been pushed out of reach.",
      },
      {
        type: "paragraph",
        text: "Shoppers who scroll back up rarely land where they were. The list has grown above them. A product they meant to revisit is gone, and the only recovery is to search again. That extra effort shows up as abandoned sessions, not as a complaint.",
      },
      {
        type: "gallery",
        images: SCREENS,
      },
      {
        type: "heading",
        text: "What the business actually pays",
      },
      {
        type: "paragraph",
        text: "The cost is not the animation. It is the missing decision. Pagination, a clear end, and a sticky path back to the cart give people a place to stop. Infinite scroll removes that place and then wonders why the average order takes longer to complete.",
      },
      {
        type: "figure",
        image: {
          src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
          alt: "A person reviewing a product page on a laptop",
        },
      },
      {
        type: "paragraph",
        text: "Teams often keep the pattern because engagement charts go up. Time on page is not the same as money collected. If more minutes are spent hunting for a product that was already seen, the metric is describing friction.",
      },
      {
        type: "heading",
        text: "A calmer way to keep going",
      },
      {
        type: "paragraph",
        text: "A load-more control, a numbered page, or a short infinite run that ends in a summary all keep the catalog moving without erasing the footer. The shopper stays oriented. The business keeps the links, trust marks, and next step that the feed had buried.",
      },
      {
        type: "paragraph",
        text: "Use infinite scroll where discovery is the product. On a store, give people a boundary they can see. The purchase happens at the edge of the list, not in the middle of a feed that never agrees to stop.",
      },
    ],
  },
  {
    slug: "moodboard-ui-ux",
    title:
      "Why Moodboard Is Your Secret Weapon in UI/UX Design? How It Shapes Great Interfaces!",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1600&q=80",
    alt: "A laptop on a desk surrounded by color swatches and design notes",
    excerpt:
      "A moodboard is the fastest way to agree on tone before a single screen is drawn.",
    date: "02 Mar 2026",
    readTime: "7 min read",
    author: AUTHOR,
    blocks: [
      {
        type: "paragraph",
        text: "A moodboard is the fastest way to agree on tone before a single screen is drawn. Color, type, photography, and spacing become a shared reference, so the interface feels decided instead of assembled.",
      },
      {
        type: "paragraph",
        text: "Most early design arguments are not about buttons. They are about whether the product should feel precise, warm, loud, or quiet. A board makes that argument visible in an afternoon, while a full set of screens can hide it for weeks.",
      },
      {
        type: "heading",
        text: "Decide the feeling before the layout",
      },
      {
        type: "paragraph",
        text: "Pull references from products people already trust, from print, from materials, from the photography you are willing to produce. If a reference cannot be matched with a real asset later, it does not belong on the board.",
      },
      {
        type: "paragraph",
        text: "The useful board is small. Five or six directions, not fifty. Each one should answer the same question: what should a first-time visitor feel in the first three seconds?",
      },
      {
        type: "gallery",
        images: SCREENS,
      },
      {
        type: "heading",
        text: "How the board becomes an interface",
      },
      {
        type: "paragraph",
        text: "Once the tone is chosen, type size, corner radius, and photography stop being taste and start being consequences. The screen is easier to review because the team is no longer debating the mood and the layout at the same time.",
      },
      {
        type: "figure",
        image: {
          src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80",
          alt: "Color studies and design references spread across a desk",
        },
      },
      {
        type: "heading",
        text: "Keep it next to the work",
      },
      {
        type: "paragraph",
        text: "A moodboard that lives in a forgotten folder cannot protect the product. Pin it beside the screens. When a new page drifts, the comparison is immediate, and the correction is smaller.",
      },
      {
        type: "paragraph",
        text: "Great interfaces rarely start with a component. They start with a picture of the feeling the product is allowed to have. The moodboard is that picture, made early enough to matter.",
      },
    ],
  },
  {
    slug: "design-systems-before-scale",
    title:
      "What Growing Teams Get Wrong About Design Systems Before the Product Scales",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=80",
    alt: "A designer reviewing a colorful interface layout on a laptop",
    excerpt:
      "A design system started too early freezes guesses. Started too late, every screen invents its own button.",
    date: "14 Feb 2026",
    readTime: "6 min read",
    author: AUTHOR,
    blocks: [
      {
        type: "paragraph",
        text: "A design system started too early freezes guesses. Started too late, every screen invents its own button. The useful moment is when the same decision is being remade for the third time.",
      },
      {
        type: "paragraph",
        text: "Growing teams often treat the system as a library to finish before the product. The product is the evidence. Without a few real flows, the tokens and components describe a product that does not exist yet.",
      },
      {
        type: "heading",
        text: "Build from repeated decisions",
      },
      {
        type: "paragraph",
        text: "Start with the pieces that already disagree: buttons, form fields, empty states, and the way a price is written. Give those a single source. Leave the rare screens alone until they repeat.",
      },
      {
        type: "gallery",
        images: SCREENS,
      },
      {
        type: "paragraph",
        text: "A system that documents everything on day one becomes a second product to maintain. A system that names the patterns people are already copying becomes a shortcut.",
      },
      {
        type: "heading",
        text: "Leave room to change",
      },
      {
        type: "figure",
        image: {
          src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1600&q=80",
          alt: "A team comparing interface options on a laptop",
        },
      },
      {
        type: "paragraph",
        text: "Scale is not a reason to lock the visual language. It is a reason to make change cheaper. When a token updates the product, the system is doing its job. When a token needs a meeting to move, the system has become the bottleneck it was meant to remove.",
      },
    ],
  },
  {
    slug: "faster-websites-and-growth",
    title:
      "How Faster Websites Quietly Change Conversion, Trust, and the Cost of Growth",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    alt: "Analytics charts on a laptop beside a notebook",
    excerpt:
      "Speed is not a technical trophy. It is the gap between intent and action.",
    date: "28 Jan 2026",
    readTime: "7 min read",
    author: AUTHOR,
    blocks: [
      {
        type: "paragraph",
        text: "Speed is not a technical trophy. It is the gap between intent and action. When a page hesitates, paid traffic gets more expensive and the brand feels less sure of itself.",
      },
      {
        type: "paragraph",
        text: "People rarely say a site was slow. They leave, or they hesitate on the form, or they open a competitor who answered first. The report later calls it a conversion problem. The wait was the cause.",
      },
      {
        type: "heading",
        text: "Trust arrives before the copy does",
      },
      {
        type: "paragraph",
        text: "A fast first view tells the visitor the company is in control. A late hero image, a jumping layout, or a button that does not respond says the opposite, even when the words are confident.",
      },
      {
        type: "gallery",
        images: SCREENS,
      },
      {
        type: "heading",
        text: "Growth gets cheaper when the page is ready",
      },
      {
        type: "paragraph",
        text: "Every campaign pays for the click and then pays again for the wait. Improving the path from landing to the next step returns more of that spend than a new headline on a page that still stalls.",
      },
      {
        type: "figure",
        image: {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
          alt: "Performance charts on a laptop screen",
        },
      },
      {
        type: "paragraph",
        text: "Measure the wait a customer feels: first content, the moment a button can be pressed, and the time to a confirmed action. Those numbers belong next to revenue, because they are already part of it.",
      },
    ],
  },
  {
    slug: "typography-people-finish",
    title:
      "The Quiet Power of Typography in Product Interfaces People Actually Finish",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    alt: "Close view of a laptop screen with code and interface text",
    excerpt:
      "People rarely praise type. They feel it as ease.",
    date: "09 Jan 2026",
    readTime: "6 min read",
    author: AUTHOR,
    blocks: [
      {
        type: "paragraph",
        text: "People rarely praise type. They feel it as ease. Line length, weight, and contrast decide whether a form, a price, or a paragraph gets read through or skipped.",
      },
      {
        type: "paragraph",
        text: "Interfaces fail in small type long before they fail in layout. A label that is too light, a price that does not stand apart, or a paragraph that runs the full width of a desktop all ask for effort the visitor did not plan to spend.",
      },
      {
        type: "heading",
        text: "Make the next sentence easy",
      },
      {
        type: "paragraph",
        text: "Keep the measure short enough that the eye can return to the next line without searching. Give headings enough weight to be found by scanning. Let body text sit in a color that is dark enough to read in daylight, not only in a design file.",
      },
      {
        type: "gallery",
        images: SCREENS,
      },
      {
        type: "figure",
        image: {
          src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
          alt: "Written notes and type studies on a desk",
        },
      },
      {
        type: "heading",
        text: "Finish is a typographic outcome",
      },
      {
        type: "paragraph",
        text: "Forms get completed when the label, the hint, and the error are distinct. Articles get finished when the line is comfortable. Pricing gets trusted when the number is the loudest thing in its block.",
      },
      {
        type: "paragraph",
        text: "None of this needs a new typeface every quarter. It needs a few sizes used on purpose, and the discipline to leave the rest of the page quieter than the thing you want someone to finish.",
      },
    ],
  },
  {
    slug: "research-over-trends",
    title:
      "Why Research Beats Trends When You Are Designing for Real Business Growth",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
    alt: "A team reviewing product ideas around a laptop in a bright office",
    excerpt:
      "Trends photograph well. Research tells you which part of the journey is leaking revenue.",
    date: "19 Dec 2025",
    readTime: "7 min read",
    author: AUTHOR,
    blocks: [
      {
        type: "paragraph",
        text: "Trends photograph well. Research tells you which part of the journey is leaking revenue. The interfaces that last are usually the ones that started with a customer problem, not a style.",
      },
      {
        type: "paragraph",
        text: "A new visual language can make a product look current and still miss the step where people drop off. The screenshot travels. The abandoned form stays in the analytics, quieter and more expensive.",
      },
      {
        type: "heading",
        text: "Watch the journey, not the feed",
      },
      {
        type: "paragraph",
        text: "Sit with the last ten people who almost bought, almost booked, or almost finished setup. The repeated hesitation is the brief. A trend can suggest a treatment. It cannot tell you which sentence, field, or wait is in the way.",
      },
      {
        type: "gallery",
        images: SCREENS,
      },
      {
        type: "heading",
        text: "Style follows the evidence",
      },
      {
        type: "figure",
        image: {
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
          alt: "A workshop where a team is mapping a customer journey",
        },
      },
      {
        type: "paragraph",
        text: "Once the leak is clear, the interface can be bold. Color, motion, and layout then serve a known moment instead of decorating a guess. That is the difference between a redesign that looks new and one that grows the business.",
      },
      {
        type: "paragraph",
        text: "Borrow what is useful from the moment. Keep what the research will still defend next year. Growth remembers the second part.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllBlogSlugs() {
  return BLOG_POSTS.map((post) => post.slug);
}

export function getRelatedPosts(slug: string, count = 3) {
  const index = BLOG_POSTS.findIndex((post) => post.slug === slug);
  if (index < 0) return BLOG_POSTS.slice(0, count);
  const ordered = [
    ...BLOG_POSTS.slice(index + 1),
    ...BLOG_POSTS.slice(0, index),
  ];
  return ordered.slice(0, count);
}
