const AbstractSeeder = require("./AbstractSeeder");
const UserSeeder = require("./UserSeeder");

class RecetteSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "recette", truncate: true, dependencies: [UserSeeder] });
    this.recettes = [
      {
        title: "Couscous Royal",
        user_id: 1,
        image: "https://locavor.fr/produit/146880-couscous-royal#produit-1",
        ingredients:
          "Semoule, agneau, poulet, merguez, pois chiches, carottes, courgettes, navets, oignons, tomates, harissa, ras el hanout",
        serving: 4,
        nutritional_values:
          "Calories: 650, Protéines: 35g, Glucides: 75g, Lipides: 25g",
        published: false,
      },
      {
        title: "Sushi Maki",
        user_id: 2,
        image: "https://www.sapporosteakhouse.com/post/what-is-maki",
        ingredients:
          "Riz à sushi, vinaigre de riz, algue nori, thon cru, concombre, avocat, wasabi, gingembre mariné, sauce soja",
        serving: 4,
        nutritional_values:
          "Calories: 350, Protéines: 12g, Glucides: 65g, Lipides: 5g",
        published: true,
      },
      {
        title: "Paella Valenciana",
        user_id: 3,
        image:
          "https://cookpad.com/uk/recipe/images/89ede9cc935ff3da?image_region_id=2",
        ingredients:
          "Riz bomba, poulet, lapin, haricots verts, tomates, safran, paprika, ail, oignons, bouillon de poulet",
        serving: 4,
        nutritional_values:
          "Calories: 550, Protéines: 30g, Glucides: 70g, Lipides: 18g",
        published: true,
      },
      {
        title: "Moussaka",
        user_id: 4,
        image:
          "https://img.over-blog-kiwi.com/1/93/59/85/20171120/ob_656c86_moussaka.jpg",
        ingredients:
          "Aubergines, viande hachée d'agneau, tomates, oignons, ail, cannelle, béchamel, fromage",
        serving: 4,
        nutritional_values:
          "Calories: 520, Protéines: 25g, Glucides: 30g, Lipides: 35g",
        published: true,
      },
      {
        title: "Feijoada",
        user_id: 5,
        image:
          "https://www.pescanova.pt/content/img/feijoada_tiras_pota_arroz_chourico.png",
        ingredients:
          "Haricots noirs, porc, bœuf séché, saucisses, ail, oignons, feuilles de laurier, oranges",
        serving: 4,
        nutritional_values:
          "Calories: 600, Protéines: 35g, Glucides: 65g, Lipides: 25g",
        published: false,
      },
      {
        title: "Pho",
        user_id: 6,
        image:
          "https://www.inspiredtaste.net/wp-content/uploads/2016/06/Vietnamese-Pho-Soup-Recipe-2.jpg",
        ingredients:
          "Nouilles de riz, bœuf, bouillon de bœuf, gingembre, anis étoilé, cannelle, basilic thaï, germes de soja, citron vert",
        serving: 4,
        nutritional_values:
          "Calories: 400, Protéines: 25g, Glucides: 60g, Lipides: 8g",
        published: false,
      },
      {
        title: "Fish and Chips",
        user_id: 7,
        image:
          "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2023/08/fish-and-chi-1200x675.jpg",
        ingredients:
          "Cabillaud, pommes de terre, farine, bière, huile de friture, petits pois, vinaigre de malt",
        serving: 4,
        nutritional_values:
          "Calories: 700, Protéines: 30g, Glucides: 80g, Lipides: 35g",
        published: false,
      },
      {
        title: "Goulash",
        user_id: 8,
        image:
          "https://ohmyveggies.com/wp-content/uploads/2022/02/Hearty-vegan-goulash-recipe-8.jpg",
        ingredients:
          "Bœuf, pommes de terre, oignons, poivrons, tomates, paprika, cumin, carvi",
        serving: 4,
        nutritional_values:
          "Calories: 450, Protéines: 28g, Glucides: 40g, Lipides: 22g",
        published: false,
      },
      {
        title: "Curry de Poulet Tikka Masala",
        user_id: 9,
        image:
          "https://platetrecette.com/wp-content/uploads/2024/05/Poulet-Tikka-Massala-ww.jpg",
        ingredients:
          "Poulet, yaourt, tomates, crème, oignons, ail, gingembre, garam masala, curcuma, coriandre",
        serving: 4,
        nutritional_values:
          "Calories: 550, Protéines: 35g, Glucides: 25g, Lipides: 35g",
        published: false,
      },
      {
        title: "Ramen",
        user_id: 10,
        image:
          "https://www.picard.fr/dw/image/v2/AAHV_PRD/on/demandware.static/-/Sites-catalog-picard/default/dw3824d9cd/recettes/R1903.png?sw=672&sh=392&q=30",
        ingredients:
          "Nouilles, bouillon de porc, porc char siu, œuf mollet, algues nori, oignons verts, pousses de bambou",
        serving: 4,
        nutritional_values:
          "Calories: 480, Protéines: 25g, Glucides: 65g, Lipides: 15g",
        published: false,
      },
      {
        title: "Chili con Carne",
        user_id: 11,
        image:
          "https://www.rivoire-et-carret.fr/app/uploads/sites/3/chili-con-carne-horiz-768x540.jpg",
        ingredients:
          "Bœuf haché, haricots rouges, tomates, oignons, ail, piments, cumin, paprika, coriandre",
        serving: 4,
        nutritional_values:
          "Calories: 420, Protéines: 30g, Glucides: 45g, Lipides: 15g",
        published: false,
      },
      {
        title: "Borscht",
        user_id: 12,
        image:
          "https://www.eatingwell.com/thmb/t1PepY4Rm91d_ExlcpsA8RYug2k=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/3747653-a2ce575ed0b44a8ca5af5ee3f12af357.jpg",
        ingredients:
          "Betteraves, chou, carottes, pommes de terre, bœuf, oignons, ail, crème fraîche, aneth",
        serving: 4,
        nutritional_values:
          "Calories: 320, Protéines: 15g, Glucides: 40g, Lipides: 12g",
        published: false,
      },
      {
        title: "Salade Grecque",
        user_id: 13,
        image: "https://assets.afcdn.com/recipe/20170421/63923_w600.jpg",
        ingredients:
          "Tomates, concombres, poivrons, oignons rouges, olives, feta, huile d'olive, origan",
        serving: 4,
        nutritional_values:
          "Calories: 280, Protéines: 8g, Glucides: 15g, Lipides: 22g",
        published: false,
      },
      {
        title: "Tacos al Pastor",
        user_id: 14,
        image:
          "https://www.foodandwine.com/thmb/W8RZu0iZ_KM8IX808I7EKqF6nRM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/al_pastor_fish_tacos_ft_073-2000-c1fcd2df7fee4902a1bc454f2e013a48.jpg",
        ingredients:
          "Porc mariné, ananas, tortillas de maïs, oignons, coriandre, citron vert, sauce piquante",
        serving: 4,
        nutritional_values:
          "Calories: 450, Protéines: 25g, Glucides: 50g, Lipides: 20g",
        published: false,
      },
      {
        title: "Risotto aux Champignons",
        user_id: 15,
        image:
          "https://m1.zeste.ca/serdy-m-dia-inc/image/upload/f_auto/fl_lossy/q_auto:eco/x_0,y_216,w_1034,h_581,c_crop/w_836,h_470,c_scale/v1507137106/foodlavie/prod/recettes/risotto-aux-champignons-et-au-fromage-le-gre-des-champs-d0ad263a",
        ingredients:
          "Riz arborio, champignons, oignons, ail, vin blanc, bouillon de légumes, parmesan, beurre",
        serving: 4,
        nutritional_values:
          "Calories: 480, Protéines: 12g, Glucides: 70g, Lipides: 18g",
        published: false,
      },
      {
        title: "Bobotie",
        user_id: 16,
        image:
          "https://miro.medium.com/v2/resize:fit:720/format:webp/1*jc3-HJu9v05KnKZxqQvCaQ.png",
        ingredients:
          "Viande hachée, pain, lait, œufs, oignons, ail, curry, abricots secs, amandes",
        serving: 4,
        nutritional_values:
          "Calories: 520, Protéines: 30g, Glucides: 35g, Lipides: 30g",
        published: false,
      },
    ];
  }

  run() {
    this.recettes.forEach((recette) => {
      this.insert(recette);
    });
  }
}

// Export the UserSeeder class
module.exports = RecetteSeeder;
