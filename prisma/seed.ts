/* eslint-disable prettier/prettier */

import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import {
  GroceryCategory,
  PrismaClient,
  ProductClass,
} from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const categoryMap: Record<string, GroceryCategory> = {
  Fruit: GroceryCategory.FRUIT,
  Vegetable: GroceryCategory.VEGETABLE,
  "Leafy Vegetable": GroceryCategory.LEAFY_VEGETABLE,
  "Root Vegetable": GroceryCategory.ROOT_VEGETABLE,
  Grain: GroceryCategory.GRAIN,
  Legume: GroceryCategory.LEGUME,
  Herb: GroceryCategory.HERB,
  Spice: GroceryCategory.SPICE,
  "Nut & Seed": GroceryCategory.NUT_SEED,
  "Nut Seed": GroceryCategory.NUT_SEED,
  "Nut/Seed": GroceryCategory.NUT_SEED,
  Mushroom: GroceryCategory.MUSHROOM,
  Other: GroceryCategory.OTHER,
};

const productClassMap: Record<string, ProductClass> = {
  GROCERY: ProductClass.GROCERY,
  RESTRICTED_LOCAL_PRODUCT: ProductClass.RESTRICTED_LOCAL_PRODUCT,
};

function getCategory(category: string): GroceryCategory {
  const mapped = categoryMap[category];

  if (!mapped) {
    throw new Error(`Unsupported grocery category: ${category}`);
  }

  return mapped;
}

function getProductClass(productClass: string): ProductClass {
  const mapped = productClassMap[productClass];

  if (!mapped) {
    throw new Error(`Unsupported product class: ${productClass}`);
  }

  return mapped;
}

const groceries = [
  {
    slug: "tomato",
    name: "Tomato",
    scientificName:
      "Solanum lycopersicum",
    aliases: [],
    localNames: [],
    category: "Vegetable",
    productClass: "GROCERY",
    shortDescription:
      "A juicy and versatile produce item commonly used in salads, sauces, soups, and stews.",
    description:
      "Tomatoes are widely cultivated fruits that are commonly treated as vegetables in cooking.",
    growingEnvironment:
      "Tomatoes generally grow best in warm conditions with plenty of sunlight and fertile, well-drained soil.",
    harvestingProcess:
      "Tomatoes are commonly harvested by hand after reaching the appropriate maturity.",
    howToChoose: [
      "Look for tomatoes with an even colour appropriate for the variety.",
      "Choose fruit that feels firm but gives slightly under gentle pressure when ripe.",
      "Avoid deeply bruised, split, leaking, or mouldy fruit.",
    ],
    howToStore: [
      "Keep unripe tomatoes at room temperature until they ripen.",
      "Ripe tomatoes can be refrigerated when longer storage is necessary.",
    ],
    commonUses: [
      "Fresh salads",
      "Sauces",
      "Soups",
      "Stews",
      "Juices",
    ],
    seasonality: {
      description:
        "Availability varies by climate and production method.",
      regionalNotes: [
        "Peak seasons vary by growing region.",
      ],
    },
    nutrition: {
      basis: "Per 100 g",
      vitamins: [],
      minerals: [],
      benefits: [
        "Contains vitamin C",
        "Provides potassium",
        "Contains carotenoid compounds including lycopene",
        "Provides dietary fibre",
      ],
    },
    images: [],
    isPublished: true,
  },

  {
      slug: "avocado",
      name: "Avocado",
      scientificName:
        "Persea americana",
      aliases: [],
      localNames: [],
      category: "Fruit",
      productClass: "GROCERY",
      shortDescription:
        "A creamy fruit valued for its distinctive texture and naturally occurring fats.",
      description:
        "Avocado is a subtropical and tropical fruit with soft, creamy flesh surrounding a large seed. Different cultivars vary in shape, skin colour, size, texture, and fat content.",
      growingEnvironment:
        "Avocado trees generally perform well in warm tropical to subtropical environments with deep, well-drained soil. They are sensitive to prolonged waterlogging and severe frost.",
      harvestingProcess:
        "Avocados are generally harvested after reaching physiological maturity while the fruit is still firm. Most cultivars soften and become ready to eat after harvest.",
      howToChoose: [
        "Choose firm avocados when you plan to use them several days later.",
        "For immediate use, look for fruit that gives slightly under gentle pressure.",
        "Avoid fruit with deep soft spots or major skin damage.",
      ],
      howToStore: [
        "Keep firm avocados at room temperature while they ripen.",
        "Refrigerate ripe avocados to slow further ripening.",
        "Store cut avocado covered and refrigerated.",
      ],
      commonUses: [
        "Fresh salads",
        "Sandwiches",
        "Smoothies",
        "Guacamole",
        "Spreads",
      ],
      seasonality: {
        description:
          "Avocado seasons vary by cultivar and growing region, and commercial production can provide fruit during different parts of the year.",
        regionalNotes: [
          "Different cultivars may have different harvesting seasons.",
        ],
      },
      nutrition: {
        basis: "Per 100 g",
        vitamins: [],
        minerals: [],
        benefits: [
          "Provides naturally occurring unsaturated fats",
          "Contains dietary fibre",
          "Provides potassium",
          "Contains vitamin E",
        ],
      },
      images: [],
      isPublished: true,
    },

    {
      slug: "carrot",
      name: "Carrot",
      scientificName:
        "Daucus carota",
      aliases: [],
      localNames: [],
      category: "Root Vegetable",
      productClass: "GROCERY",
      shortDescription:
        "A crisp root vegetable eaten raw, cooked, roasted, or blended.",
      description:
        "Carrots are edible storage roots available in several colours, including orange, purple, yellow, red, and white.",
      growingEnvironment:
        "Carrots grow well in cool to moderate conditions and generally prefer loose, deep, well-drained soil that allows roots to develop without obstruction.",
      harvestingProcess:
        "Carrots are harvested after reaching the desired size. Soil is normally loosened before the roots are lifted or pulled carefully from the ground.",
      howToChoose: [
        "Choose carrots that feel firm.",
        "Look for smooth roots without major soft areas.",
        "Avoid heavily shrivelled or rotting carrots.",
      ],
      howToStore: [
        "Refrigerate carrots for longer storage.",
        "Remove leafy tops before extended storage because they can draw moisture from the root.",
        "Keep carrots protected from excessive moisture loss.",
      ],
      commonUses: [
        "Fresh salads",
        "Soups",
        "Stews",
        "Roasting",
        "Juices",
      ],
      seasonality: {
        description:
          "Carrots are grown in many climates and may be available throughout much of the year depending on region and production systems.",
      },
      nutrition: {
        basis: "Per 100 g",
        vitamins: [],
        minerals: [],
        benefits: [
          "Contains beta-carotene",
          "Provides dietary fibre",
          "Contains vitamin K",
          "Carotenoids contribute to normal vitamin A nutrition",
        ],
      },
      images: [],
      isPublished: true,
    },

    {
      slug: "potato",
      name: "Potato",
      scientificName:
        "Solanum tuberosum",
      aliases: [
        "Irish potato",
      ],
      localNames: [],
      category: "Root Vegetable",
      productClass: "GROCERY",
      shortDescription:
        "A starchy underground tuber used in a wide variety of cooked meals.",
      description:
        "Potatoes are edible underground tubers produced by plants in the nightshade family. They occur in many varieties that differ in size, skin colour, flesh colour, texture, starch content, and suitability for different cooking methods.",
      growingEnvironment:
        "Potatoes generally grow best in cool to moderate conditions with loose, fertile, well-drained soil. Consistent moisture is important during tuber development, while prolonged waterlogging can encourage disease and reduce crop quality.",
      harvestingProcess:
        "Potatoes are harvested after the tubers reach the desired size and maturity. For mature potatoes, harvesting commonly begins after the foliage yellows and dies back. The soil is loosened carefully before the tubers are lifted to reduce bruising and damage.",
      howToChoose: [
        "Choose potatoes that feel firm and heavy for their size.",
        "Look for relatively smooth tubers without major cuts, soft spots, or decay.",
        "Avoid potatoes with extensive green colouring.",
        "Avoid heavily sprouted or shrivelled potatoes.",
      ],
      howToStore: [
        "Store potatoes in a cool, dark, dry, and well-ventilated place.",
        "Keep them away from direct sunlight because light can encourage greening.",
        "Avoid storing potatoes in sealed plastic bags that trap moisture.",
        "Keep potatoes separate from produce that may accelerate deterioration where practical.",
      ],
      commonUses: [
        "Boiling",
        "Frying",
        "Baking",
        "Roasting",
        "Mashed dishes",
        "Soups and stews",
      ],
      seasonality: {
        description:
          "Potato production seasons vary according to climate, altitude, cultivar, and irrigation. In areas with suitable temperatures and water availability, potatoes may be produced during several periods of the year.",
        regionalNotes: [
          "Planting and harvesting periods vary considerably between highland, temperate, and irrigated production regions.",
        ],
      },
      nutrition: {
        basis: "Per 100 g",
        vitamins: [],
        minerals: [],
        benefits: [
          "Provides carbohydrates",
          "Contains potassium",
          "Contains vitamin C",
          "Provides vitamin B6",
          "Contains dietary fibre, particularly when eaten with the skin",
        ],
      },
      images: [],
      isPublished: true,
    },

    {
      slug: "spinach",
      name: "Spinach",
      scientificName:
        "Spinacia oleracea",
      aliases: [],
      localNames: [],
      category: "Leafy Vegetable",
      productClass: "GROCERY",
      shortDescription:
        "A tender leafy vegetable commonly eaten fresh or cooked.",
      description:
        "Spinach is a leafy green vegetable valued for its tender leaves and mild flavour. It may be harvested as young leaves for salads or allowed to grow larger for cooking and other food preparations.",
      growingEnvironment:
        "Spinach generally grows best in cool to moderate conditions with fertile, well-drained soil and consistent moisture. Excessive heat and long daylight conditions can encourage premature flowering and reduce leaf quality.",
      harvestingProcess:
        "Spinach can be harvested by picking individual outer leaves while allowing the plant to continue growing, or by cutting the entire plant near soil level once it reaches the desired size.",
      howToChoose: [
        "Choose spinach with fresh-looking green leaves.",
        "Look for leaves that are crisp rather than severely wilted.",
        "Avoid leaves with extensive yellowing, sliminess, or decay.",
        "Check bunches and packages for excessive trapped moisture.",
      ],
      howToStore: [
        "Refrigerate spinach soon after purchase or harvest.",
        "Keep the leaves dry until they are ready to be washed and used.",
        "Store spinach in a breathable or loosely closed container.",
        "Use damaged or highly mature leaves sooner because they deteriorate more quickly.",
      ],
      commonUses: [
        "Cooked vegetables",
        "Fresh salads",
        "Smoothies",
        "Soups",
        "Stews",
        "Stuffed dishes",
      ],
      seasonality: {
        description:
          "Spinach is primarily a cool-season crop, although production schedules vary by climate and farming system. In moderate climates or protected production systems, it may be available during much of the year.",
        regionalNotes: [
          "Production may decline during very hot periods unless heat-tolerant varieties or protected growing systems are used.",
        ],
      },
      nutrition: {
        basis: "Per 100 g",
        vitamins: [],
        minerals: [],
        benefits: [
          "Contains folate",
          "Provides vitamin K",
          "Contains iron",
          "Contains vitamin C",
          "Provides carotenoids that can contribute to vitamin A nutrition",
          "Contains dietary fibre",
        ],
      },
      images: [],
      isPublished: true,
    },

    {
      slug: "cabbage",
      name: "Cabbage",
      scientificName:
        "Brassica oleracea var. capitata",
      aliases: [
        "Head cabbage",
      ],
      localNames: [],
      category: "Leafy Vegetable",
      productClass: "GROCERY",
      shortDescription:
        "A tightly packed leafy vegetable used raw, cooked, pickled, or fermented.",
      description:
        "Cabbage is a leafy vegetable that forms a compact head made up of overlapping leaves. Common varieties include green, red or purple, and savoy cabbage, with differences in colour, texture, density, and flavour.",
      growingEnvironment:
        "Cabbage generally grows well in cool to moderate conditions with fertile, moist, and well-drained soil. Regular moisture supports head development, while extreme heat can reduce quality or interfere with proper head formation.",
      harvestingProcess:
        "Cabbage heads are harvested once they become firm and reach an appropriate size for the variety. The head is usually cut from the stem near its base using a clean, sharp knife, often leaving some outer wrapper leaves for protection.",
      howToChoose: [
        "Choose cabbage heads that feel firm and dense for their size.",
        "Look for crisp leaves with colour appropriate for the variety.",
        "Avoid heads with extensive decay, deep cracks, or severe wilting.",
        "Minor damage to loose outer leaves can usually be removed before use.",
      ],
      howToStore: [
        "Store whole cabbage in the refrigerator.",
        "Keep cut cabbage covered or in a sealed food-safe container.",
        "Avoid washing cabbage before extended storage unless it can be dried thoroughly.",
        "Use cut cabbage sooner than an intact whole head.",
      ],
      commonUses: [
        "Stews",
        "Fresh salads",
        "Stir-fries",
        "Soups",
        "Pickled dishes",
        "Fermented dishes",
      ],
      seasonality: {
        description:
          "Cabbage is generally considered a cool-season crop, but production periods vary according to climate, altitude, cultivar, irrigation, and local farming practices.",
        regionalNotes: [
          "In cooler highland areas, cabbage may be grown during several periods of the year.",
        ],
      },
      nutrition: {
        basis: "Per 100 g",
        vitamins: [],
        minerals: [],
        benefits: [
          "Provides vitamin C",
          "Contains vitamin K",
          "Provides dietary fibre",
          "Contains folate",
          "Contains naturally occurring plant compounds found in cruciferous vegetables",
        ],
      },
      images: [],
      isPublished: true,
    },

    {
      slug: "onion",
      name: "Onion",
      scientificName:
        "Allium cepa",
      aliases: [
        "Bulb onion",
      ],
      localNames: [],
      category: "Vegetable",
      productClass: "GROCERY",
      shortDescription:
        "An aromatic bulb vegetable widely used as a base ingredient and seasoning.",
      description:
        "Onions are edible bulb vegetables used throughout the world for their distinctive flavour and aroma. Varieties differ in colour, size, sweetness, pungency, storage life, and suitability for fresh or cooked preparations.",
      growingEnvironment:
        "Onions generally grow best in full sunlight with loose, fertile, well-drained soil. Moderate temperatures and consistent moisture support early growth, while relatively dry conditions are preferred as mature bulbs approach harvest.",
      harvestingProcess:
        "Bulb onions are commonly harvested after the tops begin to yellow, weaken, and fall over. The bulbs are lifted carefully from the soil and are often cured in a dry, well-ventilated environment before longer-term storage.",
      howToChoose: [
        "Choose onions that feel firm and dry.",
        "Look for intact outer skins appropriate for the variety.",
        "Avoid bulbs with soft areas, mould, or signs of decay.",
        "Avoid onions with extensive sprouting when longer storage is intended.",
      ],
      howToStore: [
        "Store whole dry onions in a cool, dry, dark, and well-ventilated place.",
        "Avoid keeping whole onions in sealed plastic bags that trap moisture.",
        "Refrigerate cut onions in a covered food-safe container.",
        "Use cut onions within a relatively short period for best quality.",
      ],
      commonUses: [
        "Stews",
        "Sauces",
        "Fresh salads",
        "Soups",
        "Stir-fries",
        "Seasoning",
      ],
      seasonality: {
        description:
          "Onion production seasons depend on variety, day length, temperature, irrigation, and growing region. Stored cured onions can remain available well beyond their harvesting period.",
        regionalNotes: [
          "Different onion varieties are adapted to different day-length and climatic conditions.",
        ],
      },
      nutrition: {
        basis: "Per 100 g",
        vitamins: [],
        minerals: [],
        benefits: [
          "Contains vitamin C",
          "Provides small amounts of dietary fibre",
          "Contains naturally occurring sulfur-containing compounds",
          "Contains flavonoid plant compounds",
        ],
      },
      images: [],
      isPublished: true,
    },

    {
      slug: "banana",
      name: "Banana",
      scientificName:
        "Musa spp.",
      aliases: [],
      localNames: [],
      category: "Fruit",
      productClass: "GROCERY",
      shortDescription:
        "A soft fruit with naturally sweet flesh eaten fresh or used in cooked preparations.",
      description:
        "Bananas are tropical fruits produced in clusters on large herbaceous plants belonging to the genus Musa. Numerous cultivars exist, ranging from sweet dessert bananas eaten fresh to starchier cooking types.",
      growingEnvironment:
        "Bananas generally prefer warm, humid tropical to subtropical conditions with fertile, well-drained soil, regular moisture, and protection from strong winds. Growth slows considerably under cold or very dry conditions.",
      harvestingProcess:
        "Banana bunches are typically harvested after the fruits reach sufficient maturity but while they are still firm and often green. The entire bunch is cut from the plant and the individual fruits continue to ripen after harvest.",
      howToChoose: [
        "Choose greener bananas when they will be stored for several days before eating.",
        "Choose yellow bananas with the desired degree of ripeness for immediate use.",
        "Small brown speckles are common as dessert bananas become fully ripe.",
        "Avoid fruit with extensive splitting, leaking, mould, or severe bruising.",
      ],
      howToStore: [
        "Keep unripe bananas at room temperature while they ripen.",
        "Store bananas away from excessive heat and direct sunlight.",
        "Refrigerating ripe bananas can slow further softening, although the peel may darken.",
        "Store peeled or cut banana covered and refrigerated.",
      ],
      commonUses: [
        "Fresh snacks",
        "Smoothies",
        "Baking",
        "Desserts",
        "Breakfast dishes",
        "Cooked meals",
      ],
      seasonality: {
        description:
          "Bananas can be produced throughout much of the year in suitable tropical environments, although harvest volumes may vary with rainfall, temperature, cultivar, and local production conditions.",
        regionalNotes: [
          "Seasonal rainfall and irrigation availability can influence production volumes.",
        ],
      },
      nutrition: {
        basis: "Per 100 g",
        vitamins: [],
        minerals: [],
        benefits: [
          "Provides carbohydrates",
          "Contains potassium",
          "Provides vitamin B6",
          "Contains vitamin C",
          "Provides dietary fibre",
        ],
      },
      images: [],
      isPublished: true,
    },

    {
      slug: "maize",
      name: "Maize",
      scientificName:
        "Zea mays",
      aliases: [
        "Corn",
      ],
      localNames: [
        "Mahindi"
      ],
      category: "Grain",
      productClass: "GROCERY",
      shortDescription:
        "A widely cultivated cereal grain eaten fresh, dried, ground, or processed into many foods.",
      description:
        "Maize is a cereal crop that produces kernels arranged around a central cob. It occurs in many varieties intended for fresh consumption, flour production, animal feed, popping, industrial processing, and other uses.",
      growingEnvironment:
        "Maize generally grows best in warm, sunny conditions with fertile, well-drained soil and adequate moisture during vegetative growth, flowering, and grain development. Water shortages during flowering can significantly reduce yield.",
      harvestingProcess:
        "Fresh maize is harvested when the kernels are fully developed but still tender and moist. Maize intended for dry grain is left on the plant longer until the kernels mature and lose moisture, after which the cobs are harvested and dried further if necessary.",
      howToChoose: [
        "For fresh maize, choose ears with plump, well-developed kernels.",
        "Look for husks that are reasonably fresh and protect the kernels.",
        "Avoid fresh cobs with extensive mould, decay, or damaged kernels.",
        "For dry maize, choose clean, properly dried grain without visible mould or insect damage.",
      ],
      howToStore: [
        "Refrigerate fresh maize when it will not be used soon after harvest or purchase.",
        "Keep dried maize in a cool, dry, well-ventilated location.",
        "Protect dry grain from moisture because damp conditions can encourage mould growth.",
        "Store dried maize in clean containers protected from insects and rodents.",
      ],
      commonUses: [
        "Boiled maize",
        "Roasted maize",
        "Maize flour",
        "Porridge",
        "Flatbreads and stiff porridges",
        "Breakfast cereals",
      ],
      seasonality: {
        description:
          "Maize seasons are strongly influenced by rainfall, temperature, irrigation, and local planting calendars. Fresh maize is usually most abundant around harvesting periods, while properly dried grain can be stored and supplied throughout the year.",
        regionalNotes: [
          "In rain-fed production areas, planting and harvesting commonly follow regional rainy seasons.",
        ],
      },
      nutrition: {
        basis: "Per 100 g",
        vitamins: [],
        minerals: [],
        benefits: [
          "Provides carbohydrates",
          "Contains dietary fibre",
          "Provides several B vitamins",
          "Contains plant protein",
          "Yellow maize varieties contain carotenoid pigments",
        ],
      },
      images: [],
      isPublished: true,
    },

    {
      id: "10",
      slug: "beans",
      name: "Beans",
      scientificName:
        "Phaseolus vulgaris",
      aliases: [
        "Common bean",
      ],
      localNames: [],
      category: "Legume",
      productClass: "GROCERY",
      shortDescription:
        "Edible legume seeds valued as an important source of plant protein and dietary fibre.",
      description:
        "Common beans are legumes produced inside pods and occur in numerous varieties differing in colour, size, shape, flavour, and cooking characteristics. They may be consumed as tender green pods, fresh shelled beans, or fully mature dried seeds.",
      growingEnvironment:
        "Beans generally grow well in warm to moderate conditions with good sunlight and fertile, well-drained soil. Adequate moisture is particularly important during flowering and pod development, while prolonged waterlogging can damage the roots.",
      harvestingProcess:
        "Beans intended for fresh pods are picked while the pods are young and tender. Beans grown for dry seed are usually left on the plant until the pods and seeds mature and begin drying, after which they are harvested, shelled, and dried further for storage if necessary.",
      howToChoose: [
        "For fresh beans, choose pods that are firm, fresh-looking, and free from major damage.",
        "For dry beans, choose seeds that are clean, dry, and reasonably uniform.",
        "Avoid beans showing visible mould, severe insect damage, or unusual moisture.",
        "Discard damaged or deteriorated beans before cooking.",
      ],
      howToStore: [
        "Refrigerate fresh bean pods and use them while they remain crisp.",
        "Store dried beans in a cool and dry location.",
        "Keep dried beans in clean, tightly closed containers to reduce exposure to moisture and pests.",
        "Store cooked beans covered in the refrigerator.",
      ],
      commonUses: [
        "Stews",
        "Soups",
        "Salads",
        "Mashed dishes",
        "Bean sauces",
        "Mixed grain and legume dishes",
      ],
      seasonality: {
        description:
          "Bean production seasons depend on rainfall, temperature, variety, irrigation, and local planting cycles. Fresh beans are seasonal in many regions, while properly dried beans can be stored and remain available throughout much of the year.",
        regionalNotes: [
          "Rain-fed bean production commonly follows local rainy-season planting calendars.",
        ],
      },
      nutrition: {
        basis: "Per 100 g",
        vitamins: [],
        minerals: [],
        benefits: [
          "Provides plant protein",
          "Contains dietary fibre",
          "Provides iron",
          "Contains folate",
          "Provides complex carbohydrates",
        ],
      },
      images: [],
      isPublished: true,
    },

];

async function main() {
  for (const item of groceries) {
    await prisma.$transaction(async (tx) => {
      const data = {
        name: item.name,
        scientificName: item.scientificName ?? null,
        category: getCategory(item.category),
        productClass: getProductClass(item.productClass),
        shortDescription: item.shortDescription,
        description: item.description,
        growingEnvironment: item.growingEnvironment,
        harvestingProcess: item.harvestingProcess,
        howToChoose: item.howToChoose,
        howToStore: item.howToStore,
        commonUses: item.commonUses,
        seasonality: item.seasonality,
        isPublished: item.isPublished,
      };

      const grocery = await tx.grocery.upsert({
        where: {
          slug: item.slug,
        },
        update: data,
        create: {
          slug: item.slug,
          ...data,
        },
      });

      for (const alias of item.aliases ?? []) {
        await tx.groceryAlias.upsert({
          where: {
            groceryId_name: {
              groceryId: grocery.id,
              name: alias,
            },
          },
          update: {
            isLocalName: false,
          },
          create: {
            groceryId: grocery.id,
            name: alias,
            isLocalName: false,
          },
        });
      }

      for (const localName of item.localNames ?? []) {
        await tx.groceryAlias.upsert({
          where: {
            groceryId_name: {
              groceryId: grocery.id,
              name: localName,
            },
          },
          update: {
            isLocalName: true,
          },
          create: {
            groceryId: grocery.id,
            name: localName,
            isLocalName: true,
          },
        });
      }

      await tx.groceryNutrition.upsert({
        where: {
          groceryId: grocery.id,
        },
        update: {
          basis: item.nutrition.basis,
          vitamins: item.nutrition.vitamins,
          minerals: item.nutrition.minerals,
          benefits: item.nutrition.benefits,
        },
        create: {
          groceryId: grocery.id,
          basis: item.nutrition.basis,
          vitamins: item.nutrition.vitamins,
          minerals: item.nutrition.minerals,
          benefits: item.nutrition.benefits,
        },
      });
    });

    console.log(`Seeded: ${item.name}`);
  }

  console.log(`Grocify seed complete. ${groceries.length} groceries processed.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
