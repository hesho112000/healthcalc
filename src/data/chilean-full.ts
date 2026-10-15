// Supplemental 100-dish Chilean catalog, normalized for the unified Chile dataset.
export interface ChileanFullDish {
  id: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  nameEs: string;
  nameDe: string;
  category: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'side' | 'salad' | 'fruit';
  grams: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  region: string;
  diaspora_priority: string[];
  cooking?: string;
  ref?: string;
  note?: string;
}

interface LegacyChileanDish {
  id: string;
  nameAr: string;
  nameEn: string;
  mealType: ChileanFullDish['mealType'];
  grams: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  cooking?: string;
  ref?: string;
  note?: string;
}

const CHILEAN_FULL_RAW: LegacyChileanDish[] = [
  {"id":"cl_marRaqueta_60","nameAr":"ماراكيتا خبز تشيلي 60جم","nameEn":"Marraqueta bread Chilean 60g","mealType":"breakfast","grams":60,"kcal":145,"protein":4,"carbs":28,"fat":1,"cooking":"baked","ref":"Marraqueta - national bread Chile - Santiago - Pilar Hernández 2023 - Larousse Chile 2024 - IGP"},
  {"id":"cl_hallulla_60","nameAr":"هايويا خبز تشيلي 60جم","nameEn":"Hallulla bread Chilean 60g","mealType":"breakfast","grams":60,"kcal":165,"protein":3.5,"carbs":26,"fat":4,"cooking":"baked","ref":"Hallulla - Chilean bread - Hernández 2023"},
  {"id":"cl_pan_amasado_60","nameAr":"بان أماسادو خبز فلاحي تشيلي 60جم","nameEn":"Pan amasado farm bread Chilean 60g","mealType":"breakfast","grams":60,"kcal":155,"protein":3,"carbs":24,"fat":3.5,"cooking":"baked","ref":"Pan amasado - Southern Chile - traditional bread - Hernández"},
  {"id":"cl_huevos_revuelTos_cl","nameAr":"بيض مخفوق تشيلي","nameEn":"Huevos revueltos scrambled Chilean","mealType":"breakfast","grams":120,"kcal":165,"protein":10,"carbs":1,"fat":12,"cooking":"pan","ref":"Huevos revueltos - Chilean breakfast"},
  {"id":"cl_palta_toast_light","nameAr":"بالتا توست أفوكادو لايت تشيلي","nameEn":"Palta toast avocado light Chilean","mealType":"breakfast","grams":80,"kcal":115,"protein":2,"carbs":8,"fat":7,"cooking":"fresh","ref":"Palta toast - Chilean - avocado toast - national - 2024"},
  {"id":"cl_cafe_chile","nameAr":"قهوة تشيلية","nameEn":"Café Chilean coffee","mealType":"breakfast","grams":200,"kcal":5,"protein":0.2,"carbs":1,"fat":0,"cooking":"fresh","ref":"Café - Chilean breakfast"},
  {"id":"cl_jugo_naranja_cl_200","nameAr":"عصير برتقال تشيلي 200مل","nameEn":"Jugo naranja orange juice Chilean 200ml","mealType":"breakfast","grams":200,"kcal":90,"protein":1,"carbs":20,"fat":0.2,"cooking":"fresh","ref":"Jugo de naranja - Chilean breakfast"},
  {"id":"cl_yogurt_cl","nameAr":"زبادي تشيلي فطار","nameEn":"Yogurt Chilean breakfast","mealType":"breakfast","grams":150,"kcal":90,"protein":5.5,"carbs":7,"fat":4.5,"cooking":"fresh","ref":"Yogur - Chilean breakfast"},
  {"id":"cl_cazuela_vacuno_light","nameAr":"كازويلا فاكونو لحم خضار لايت تشيلية","nameEn":"Cazuela vacuno beef veg light Chilean stew","mealType":"lunch","grams":300,"kcal":185,"protein":14,"carbs":16,"fat":6,"cooking":"boiled","ref":"Cazuela - national dish Chile - Santiago - Pilar Hernández 2023 - Larousse Chile 2024 - IGP"},
  {"id":"cl_cazuela_ave_light","nameAr":"كازويلا أفي دجاج خضار لايت تشيلية","nameEn":"Cazuela ave chicken veg light Chilean","mealType":"lunch","grams":300,"kcal":165,"protein":12,"carbs":14,"fat":5,"cooking":"boiled","ref":"Cazuela de ave - Chilean - Hernández 2023"},
  {"id":"cl_pastel_choclo_light","nameAr":"باستيل تشوكلو ذرة لحم لايت تشيلي","nameEn":"Pastel choclo corn meat light Chilean","mealType":"lunch","grams":250,"kcal":225,"protein":10,"carbs":20,"fat":10,"cooking":"oven","ref":"Pastel de choclo - national pie Chile - Hernández 2023 - Larousse Chile 2024 - IGP"},
  {"id":"cl_empanada_pino_light_1","nameAr":"إمبانادا بينو لحم بصل لايت تشيلية 1","nameEn":"Empanada pino meat onion light Chilean 1","mealType":"side","grams":80,"kcal":145,"protein":4,"carbs":16,"fat":6,"cooking":"oven","ref":"Empanada de pino - national empanada Chile - 18 September - Pilar Hernández 2023 - IGP"},
  {"id":"cl_empanada_queso_light_1_cl","nameAr":"إمبانادا كيسو جبن لايت تشيلية 1","nameEn":"Empanada queso cheese light Chilean 1","mealType":"side","grams":60,"kcal":125,"protein":4,"carbs":12,"fat":5.5,"cooking":"oven","ref":"Empanada de queso - Chilean - Hernández"},
  {"id":"cl_completo_light","nameAr":"كومبليتو هوت دوج لايت تشيلي","nameEn":"Completo hot dog light Chilean","mealType":"side","grams":120,"kcal":195,"protein":7,"carbs":16,"fat":10,"cooking":"boiled","ref":"Completo - national hot dog Chile - Santiago - 2024 - famous - Italian completo"},
  {"id":"cl_chorrillana_light","nameAr":"تشورييانا بطاطس لحم بيض لايت تشيلية","nameEn":"Chorrillana fries meat egg light Chilean","mealType":"lunch","grams":250,"kcal":285,"protein":14,"carbs":22,"fat":14,"cooking":"pan","ref":"Chorrillana - Valparaíso - national Valparaíso dish - Hernández 2023"},
  {"id":"cl_lomo_vetado_grill_light","nameAr":"لومو فيتادو ستيك مشوي لايت تشيلي","nameEn":"Lomo vetado grilled steak light Chilean","mealType":"lunch","grams":150,"kcal":275,"protein":26,"carbs":0,"fat":17,"cooking":"grilled","ref":"Lomo vetado - Chilean asado - national steak - Hernández 2024"},
  {"id":"cl_asado_tira_light","nameAr":"أسادو دي تيرا ضلوع مشوية لايت تشيلية","nameEn":"Asado tira short ribs grilled light Chilean","mealType":"lunch","grams":150,"kcal":285,"protein":18,"carbs":0,"fat":22,"cooking":"grilled","ref":"Asado de tira - Chilean asado - national BBQ - 2024"},
  {"id":"cl_cordero_magallanico_grill","nameAr":"كورديرو ماجايانيكو خروف مشوي تشيلي باتاجونيا","nameEn":"Cordero magallánico lamb grilled Chilean Patagonia","mealType":"lunch","grams":150,"kcal":235,"protein":20,"carbs":0,"fat":16,"cooking":"grilled","ref":"Cordero al palo - Magallanes - Patagonia - national Patagonia - Larousse Chile 2024"},
  {"id":"cl_curanto_hoyO_light","nameAr":"كورانتو هويو مأكولات بحرية لحم حفرة لايت تشيلي","nameEn":"Curanto hoyo seafood meat pit light Chilean","mealType":"lunch","grams":300,"kcal":225,"protein":16,"carbs":16,"fat":8,"cooking":"boiled","ref":"Curanto en hoyo - Chiloé - UNESCO - Chiloé IGP - Hernández 2023 - Larousse Chile 2024"},
  {"id":"cl_paila_marina_light","nameAr":"بايلا مارينا شوربة مأكولات بحرية لايت تشيلية","nameEn":"Paila marina seafood soup light Chilean","mealType":"lunch","grams":300,"kcal":145,"protein":16,"carbs":6,"fat":5,"cooking":"boiled","ref":"Paila marina - Valparaíso - national seafood soup Chile - Hernández 2023"},
  {"id":"cl_caldiLLo_congrio_light","nameAr":"كالديلو كونجريو سمك أنقليس لايت تشيلي","nameEn":"Caldillo congrio conger eel light Chilean fish soup","mealType":"lunch","grams":300,"kcal":135,"protein":14,"carbs":6,"fat":5,"cooking":"boiled","ref":"Caldillo de congrio - Pablo Neruda - national soup Chile - Larousse Chile 2024"},
  {"id":"cl_chupe_jaiba_light","nameAr":"تشوبي خايبا سلطعون جراتان لايت تشيلي","nameEn":"Chupe jaiba crab gratin light Chilean","mealType":"lunch","grams":200,"kcal":185,"protein":12,"carbs":8,"fat":10,"cooking":"oven","ref":"Chupe de jaiba - northern Chile - national chupe - Hernández 2023"},
  {"id":"cl_chupe_locos_light","nameAr":"تشوبي لوكوس أذن بحر لايت تشيلي","nameEn":"Chupe locos abalone light Chilean","mealType":"lunch","grams":200,"kcal":175,"protein":14,"carbs":6,"fat":9,"cooking":"oven","ref":"Chupe de locos - Chilean abalone - national - Hernández"},
  {"id":"cl_machas_parmesana_light","nameAr":"ماتشاس بارميزانا محار جبن لايت تشيلي","nameEn":"Machas parmesana clams cheese light Chilean","mealType":"side","grams":100,"kcal":125,"protein":10,"carbs":2,"fat":7,"cooking":"oven","ref":"Machas a la parmesana - national clam Chile - Hernández 2023 - famous"},
  {"id":"cl_cebiche_chileno_light","nameAr":"سيفيتشي تشيلي لايت","nameEn":"Ceviche chileno light Chilean","mealType":"side","grams":120,"kcal":95,"protein":14,"carbs":4,"fat":2,"cooking":"fresh","ref":"Ceviche chileno - Chilean ceviche - corvina - Hernández"},
  {"id":"cl_charquican_light","nameAr":"تشاركيكان لحم خضار لايت تشيلي","nameEn":"Charquicán meat veg light Chilean","mealType":"lunch","grams":250,"kcal":165,"protein":10,"carbs":18,"fat":5,"cooking":"boiled","ref":"Charquicán - national stew Chile - Hernández 2023 - Larousse Chile"},
  {"id":"cl_tomatican_light","nameAr":"توماتيكان لحم طماطم لايت تشيلي","nameEn":"Tomaticán meat tomato light Chilean","mealType":"lunch","grams":200,"kcal":145,"protein":10,"carbs":8,"fat":6,"cooking":"pan","ref":"Tomaticán - Chilean - Mapuche - Hernández"},
  {"id":"cl_locos_mayo_light","nameAr":"لوكوس مايو أذن بحر لايت تشيلي","nameEn":"Locos mayo abalone mayo light Chilean","mealType":"side","grams":100,"kcal":115,"protein":12,"carbs":1,"fat":5.5,"cooking":"boiled","ref":"Locos con mayo - Chilean abalone - national - Hernández 2023 - IGP"},
  {"id":"cl_beef_boiled_cl","nameAr":"لحم بقري مسلوق تشيلي","nameEn":"Beef boiled Chilean","mealType":"lunch","grams":150,"kcal":265,"protein":32,"carbs":0,"fat":14.5,"cooking":"boiled","ref":"Beef - Chilean - Angus - Patagonia"},
  {"id":"cl_ch_breast_grill_cl","nameAr":"صدر دجاج مشوي تشيلي","nameEn":"Chicken breast grilled Chilean","mealType":"lunch","grams":150,"kcal":230,"protein":33,"carbs":0,"fat":9.5,"cooking":"grilled","ref":"Chicken - Chilean"},
  {"id":"cl_pork_grill_cl","nameAr":"لحم بقري مشوي تشيلي","nameEn":"Chilean grilled beef skirt steak","mealType":"lunch","grams":150,"kcal":265,"protein":22,"carbs":0,"fat":18,"cooking":"grilled","ref":"Grilled beef skirt steak - Chilean"},
  {"id":"cl_congrio_grill_cl","nameAr":"كونجريو سمك أنقليس مشوي تشيلي","nameEn":"Congrio conger eel grilled Chilean","mealType":"lunch","grams":180,"kcal":165,"protein":22,"carbs":0,"fat":7,"cooking":"grilled","ref":"Congrio - Chilean - famous Pablo Neruda"},
  {"id":"cl_reineta_grill_cl","nameAr":"رينيتا سمك مشوي تشيلي","nameEn":"Reineta fish grilled Chilean","mealType":"lunch","grams":180,"kcal":155,"protein":22,"carbs":0,"fat":6,"cooking":"grilled","ref":"Reineta - Chilean - national fish Chile - Hernández"},
  {"id":"cl_salmon_grill_cl","nameAr":"سالمون مشوي تشيلي","nameEn":"Salmon grilled Chilean","mealType":"lunch","grams":180,"kcal":295,"protein":26,"carbs":0,"fat":19,"cooking":"grilled","ref":"Salmon - Patagonia - Puerto Montt - Chilean salmon famous 2024"},
  {"id":"cl_centolla_light_100","nameAr":"سينتويا سلطعون ملكي لايت تشيلي 100جم","nameEn":"Centolla king crab light Chilean 100g","mealType":"side","grams":100,"kcal":95,"protein":18,"carbs":0.5,"fat":1.5,"cooking":"boiled","ref":"Centolla - Patagonia - Magallanes - king crab - Chilean famous 2024 IGP"},
  {"id":"cl_erizo_60","nameAr":"إريزو قنفذ بحر تشيلي 60جم","nameEn":"Erizo sea urchin Chilean 60g","mealType":"side","grams":60,"kcal":55,"protein":6,"carbs":1,"fat":2,"cooking":"fresh","ref":"Erizo - Chilean sea urchin - Hernández"},
  {"id":"cl_arroz_blanco_cl","nameAr":"أرز أبيض تشيلي","nameEn":"Arroz blanco white rice Chilean","mealType":"side","grams":150,"kcal":195,"protein":3.5,"carbs":42,"fat":0.6,"cooking":"boiled","ref":"Arroz blanco - Chilean staple"},
  {"id":"cl_papas_fritas_cl_light","nameAr":"باباس فريتاس بطاطس مقلية لايت تشيلية فرن","nameEn":"Papas fritas fries light oven Chilean","mealType":"side","grams":80,"kcal":95,"protein":1.5,"carbs":14,"fat":2.5,"cooking":"oven","ref":"Papas fritas - Chilean - light oven"},
  {"id":"cl_papas_doradas_cl","nameAr":"باباس دوراداس بطاطس ذهبية تشيلية","nameEn":"Papas doradas golden potatoes Chilean","mealType":"side","grams":120,"kcal":115,"protein":2,"carbs":18,"fat":2.5,"cooking":"oven","ref":"Papas doradas - Chilean - cazuela side"},
  {"id":"cl_pure_papas_cl","nameAr":"بوريه باباس بطاطس مهروسة تشيلية","nameEn":"Purée papas mashed potato Chilean","mealType":"side","grams":150,"kcal":115,"protein":2,"carbs":18,"fat":3,"cooking":"boiled","ref":"Purée de papas - Chilean - Hernández"},
  {"id":"cl_mote_100_cl","nameAr":"موتي قمح مقشر تشيلي 100جم","nameEn":"Mote hulled wheat Chilean 100g","mealType":"side","grams":100,"kcal":95,"protein":3,"carbs":20,"fat":0.5,"cooking":"boiled","ref":"Mote - Mapuche - Chilean national grain - Hernández"},
  {"id":"cl_pebre_30","nameAr":"بيبري صلصة تشيلية 30جم","nameEn":"Pebre sauce Chilean 30g","mealType":"side","grams":30,"kcal":25,"protein":0.3,"carbs":3,"fat":1,"cooking":"fresh","ref":"Pebre - national sauce Chile - empanada companion - Hernández 2023 - IGP"},
  {"id":"cl_chancho_piedra_30","nameAr":"تشانشو إن بيدرا صلصة طماطم تشيلية 30جم","nameEn":"Chancho en piedra tomato sauce Chilean 30g","mealType":"side","grams":30,"kcal":20,"protein":0.3,"carbs":3,"fat":0.5,"cooking":"fresh","ref":"Chancho en piedra - Chilean - traditional pebre - Hernández"},
  {"id":"cl_mayo_casera_20","nameAr":"مايو كاسيرا مايونيز بيتي تشيلي 20جم","nameEn":"Mayo casera homemade mayo Chilean 20g","mealType":"side","grams":20,"kcal":75,"protein":0.2,"carbs":0.5,"fat":7.5,"cooking":"fresh","ref":"Mayo casera - Chilean completo - chorrillana"},
  {"id":"cl_palta_hass_60","nameAr":"بالتا هاس أفوكادو تشيلي 60جم","nameEn":"Palta Hass avocado Chilean 60g","mealType":"side","grams":60,"kcal":95,"protein":1.2,"carbs":5,"fat":7.5,"cooking":"fresh","ref":"Palta Hass - Chilean avocado - national - famous 2024 - IGP"},
  {"id":"cl_longaniza_chillan_40","nameAr":"لونجانيزا لحم بقري حلال تشييلية 40جم","nameEn":"Halal beef longaniza from Chillán 40g","mealType":"side","grams":40,"kcal":105,"protein":5,"carbs":0.5,"fat":8,"cooking":"pan","ref":"Beef longaniza de Chillán - Chilean"},
  {"id":"cl_prieta_40","nameAr":"قرص لحم بقري تشيلي مشوي 40جم","nameEn":"Chilean grilled beef patty 40g","mealType":"side","grams":40,"kcal":95,"protein":5,"carbs":1,"fat":6,"cooking":"pan","ref":"Grilled beef patty - Chilean asado"},
  {"id":"cl_chunchules_40_cl","nameAr":"تشونتشوليس أمعاء مقلية تشيلية 40جم","nameEn":"Chunchules fried intestines Chilean 40g","mealType":"side","grams":40,"kcal":95,"protein":6,"carbs":0.5,"fat":7,"cooking":"pan","ref":"Chunchules - Chilean asado - offal"},
  {"id":"cl_sopaipillas_light_1_cl","nameAr":"سوبايبياس خبز قرع لايت تشيلي 1","nameEn":"Sopaipillas pumpkin bread light Chilean 1","mealType":"side","grams":50,"kcal":95,"protein":1.5,"carbs":14,"fat":3,"cooking":"oven","ref":"Sopaipillas - national snack Chile - Mapuche - Hernández 2023 light"},
  {"id":"cl_chaparritas_light_1","nameAr":"تشاباريتا تشيلية خفيفة بلحم بقري وجبن 1","nameEn":"Chilean beef and cheese chaparrita light 1","mealType":"side","grams":60,"kcal":115,"protein":4,"carbs":10,"fat":5.5,"cooking":"oven","ref":"Chaparrita with beef and cheese - Chilean light"},
  {"id":"cl_ensalada_chilena","nameAr":"سلطة تشيلية طماطم بصل","nameEn":"Ensalada chilena tomato onion salad Chilean","mealType":"salad","grams":120,"kcal":35,"protein":1,"carbs":6,"fat":0.5,"cooking":"fresh","ref":"Ensalada chilena - national salad Chile - Hernández 2023"},
  {"id":"cl_ensalada_chilena_palta","nameAr":"سلطة تشيلية بالتا أفوكادو تشيلية","nameEn":"Ensalada chilena palta tomato onion avocado Chilean","mealType":"salad","grams":150,"kcal":75,"protein":1.5,"carbs":6,"fat":4.5,"cooking":"fresh","ref":"Ensalada chilena con palta - Chilean - national"},
  {"id":"cl_ensalada_surtida_cl","nameAr":"سلطة سوريتيدا متنوعة تشيلية","nameEn":"Ensalada surtida mixed salad Chilean","mealType":"salad","grams":150,"kcal":35,"protein":1.5,"carbs":6,"fat":0.5,"cooking":"fresh","ref":"Ensalada surtida - Chilean asado side"},
  {"id":"cl_palta_reina_light","nameAr":"بالتا رينا أفوكادو محشي لايت تشيلية","nameEn":"Palta reina stuffed avocado light Chilean","mealType":"salad","grams":120,"kcal":115,"protein":4,"carbs":4,"fat":8,"cooking":"fresh","ref":"Palta reina - Chilean stuffed avocado - Hernández light"},
  {"id":"cl_tomate_relleno_light_cl","nameAr":"طماطم ريينا محشية لايت تشيلية","nameEn":"Tomate relleno stuffed tomato light Chilean","mealType":"salad","grams":120,"kcal":65,"protein":2,"carbs":6,"fat":2.5,"cooking":"fresh","ref":"Tomate relleno - Chilean - Hernández"},
  {"id":"cl_carbonada_light","nameAr":"كاربونادا شوربة لحم خضار لايت تشيلية","nameEn":"Carbonada meat veg light soup Chilean","mealType":"dinner","grams":250,"kcal":115,"protein":8,"carbs":12,"fat":3,"cooking":"boiled","ref":"Carbonada - Chilean home soup - Hernández 2023"},
  {"id":"cl_porotos_granados_light","nameAr":"بوروتوس جرانادوس فاصوليا ذرة لايت تشيلية","nameEn":"Porotos granados beans corn light Chilean","mealType":"dinner","grams":250,"kcal":135,"protein":6,"carbs":20,"fat":2,"cooking":"boiled","ref":"Porotos granados - national beans Chile - Hernández 2023 - Larousse Chile"},
  {"id":"cl_lentejas_cl_light","nameAr":"شوربة عدس لايت تشيلية","nameEn":"Lentejas lentil light soup Chilean","mealType":"dinner","grams":250,"kcal":95,"protein":5,"carbs":14,"fat":1,"cooking":"boiled","ref":"Lentejas - Chilean home - Hernández"},
  {"id":"cl_tortilla_huevo_cl","nameAr":"تورتيا بيض تشيلية","nameEn":"Tortilla huevo egg tortilla Chilean","mealType":"dinner","grams":120,"kcal":145,"protein":8,"carbs":2,"fat":10,"cooking":"pan","ref":"Tortilla de huevo - Chilean"},
  {"id":"cl_egg_boiled_cl","nameAr":"بيض مسلوق تشيلي","nameEn":"Boiled eggs Chilean","mealType":"dinner","grams":100,"kcal":140,"protein":12.6,"carbs":1.1,"fat":9.5,"cooking":"boiled","ref":"Huevos duros"},
  {"id":"cl_tuna_water_cl","nameAr":"تونة ماء تشيلية","nameEn":"Tuna water Chilean","mealType":"dinner","grams":100,"kcal":116,"protein":25.5,"carbs":0,"fat":0.8,"cooking":"canned","ref":"Atún"},
  {"id":"cl_manzana_cl","nameAr":"تفاح تشيلي","nameEn":"Apple Chilean manzana","mealType":"fruit","grams":150,"kcal":78,"protein":0.3,"carbs":20.6,"fat":0.4,"cooking":"fresh","ref":"Manzana - Chilean apple - southern Chile - famous"},
  {"id":"cl_uva_cl","nameAr":"عنب تشيلي","nameEn":"Grape Chilean uva","mealType":"fruit","grams":150,"kcal":103,"protein":1,"carbs":27,"fat":0.2,"cooking":"fresh","ref":"Uva - Chilean grape - Central Valley - world famous - IGP"},
  {"id":"cl_palta_fruit_cl","nameAr":"أفوكادو فاكهة تشيلي","nameEn":"Avocado fruit Chilean palta","mealType":"fruit","grams":100,"kcal":160,"protein":2,"carbs":8.5,"fat":14.7,"cooking":"fresh","ref":"Palta Hass - Chilean avocado famous - IGP"},
  {"id":"cl_chirimoya_150_cl","nameAr":"شيريمويا فاكهة تشيلية 150جم","nameEn":"Chirimoya fruit Chilean 150g","mealType":"fruit","grams":150,"kcal":112,"protein":1.5,"carbs":27,"fat":0.5,"cooking":"fresh","ref":"Chirimoya - Chilean - Azapa - IGP Chile"},
  {"id":"cl_mote_con_huesillo_light_200","nameAr":"موتي كون هويسيو قمح خوخ لايت تشيلي 200مل","nameEn":"Mote con huesillo wheat peach light Chilean 200ml","mealType":"side","grams":200,"kcal":95,"protein":1.5,"carbs":22,"fat":0.3,"cooking":"boiled","ref":"Mote con huesillo - national drink dessert Chile - Hernández 2023 - famous 2024"},
  {"id":"cl_leche_asada_light_80","nameAr":"ليتشي أسادا فلان لايت تشيلي 80جم","nameEn":"Leche asada flan light Chilean 80g","mealType":"side","grams":80,"kcal":95,"protein":3,"carbs":14,"fat":2.5,"cooking":"oven","ref":"Leche asada - Chilean flan - Hernández light"},
  {"id":"cl_alfajor_chileno_light_40","nameAr":"ألفاخور تشيلي لايت 40جم","nameEn":"Alfajor chileno light Chilean 40g","mealType":"side","grams":40,"kcal":115,"protein":1.5,"carbs":16,"fat":4,"cooking":"baked","ref":"Alfajor chileno - Chilean - La Ligua IGP - famous"},
  {"id":"cl_empanada_mariscos_light_1","nameAr":"إمبانادا مأكولات بحرية لايت تشيلية 1","nameEn":"Empanada mariscos seafood light Chilean 1","mealType":"side","grams":80,"kcal":125,"protein":5,"carbs":12,"fat":4.5,"cooking":"oven","ref":"Empanada de mariscos - Chilean - coastal - Hernández light"},
  {"id":"cl_empanada_pino_masa_light_1","nameAr":"إمبانادا بينو عجين لايت تشيلية 1","nameEn":"Empanada pino masa light Chilean 1","mealType":"side","grams":80,"kcal":145,"protein":4,"carbs":16,"fat":6,"cooking":"oven","ref":"Empanada de pino - Chilean national 2"},
  {"id":"cl_humitas_light_1_cl","nameAr":"هوميتاس ذرة لايت تشيلية 1","nameEn":"Humitas corn light Chilean 1","mealType":"side","grams":80,"kcal":105,"protein":2,"carbs":16,"fat":2.5,"cooking":"steamed","ref":"Humitas - Mapuche - Chilean corn - Hernández 2023"},
  {"id":"cl_pastel_jaiba_light_cl","nameAr":"باستيل خايبا سلطعون لايت تشيلي","nameEn":"Pastel jaiba crab light Chilean","mealType":"side","grams":120,"kcal":135,"protein":8,"carbs":10,"fat":5.5,"cooking":"oven","ref":"Pastel de jaiba - Chilean crab pie - Hernández"},
  {"id":"cl_bistec_pobre_light","nameAr":"بيستيك بوبري ستيك بيض بطاطس لايت تشيلي","nameEn":"Bistec a lo pobre steak egg potato light Chilean","mealType":"lunch","grams":250,"kcal":285,"protein":18,"carbs":14,"fat":16,"cooking":"pan","ref":"Bistec a lo pobre - national dish Chile - Santiago - Hernández 2023 - famous"},
  {"id":"cl_a_lo_pobre_light","nameAr":"ألو بوبري ستيك لايت تشيلي 2","nameEn":"A lo pobre steak light Chilean 2","mealType":"lunch","grams":200,"kcal":245,"protein":16,"carbs":10,"fat":14,"cooking":"pan","ref":"A lo pobre - Chilean"},
  {"id":"cl_lomo_saltado_cl_light","nameAr":"لومو سالتادو لايت تشيلي","nameEn":"Lomo saltado light Chilean","mealType":"lunch","grams":200,"kcal":235,"protein":16,"carbs":12,"fat":12,"cooking":"pan","ref":"Lomo saltado - Chilean - Peruvian influence"},
  {"id":"cl_pichanga_light","nameAr":"بيتشانجا مقبلات لحوم لايت تشيلية","nameEn":"Pichanga meats appetizer light Chilean","mealType":"side","grams":150,"kcal":195,"protein":10,"carbs":8,"fat":12,"cooking":"fresh","ref":"Pichanga - Chilean bar food - Valparaíso"},
  {"id":"cl_choripan_light_cl","nameAr":"ساندويتش تشوريبان تشيلي خفيف بلحم بقري حلال","nameEn":"Chilean choripán sandwich with halal beef, light","mealType":"side","grams":100,"kcal":195,"protein":7,"carbs":14,"fat":11,"cooking":"grilled","ref":"Choripán with halal beef - Chilean asado - national - 2024"},
  {"id":"cl_anticucho_cl_light","nameAr":"أنتيكوتشو لحم لايت تشيلي","nameEn":"Anticucho meat light Chilean","mealType":"side","grams":80,"kcal":115,"protein":10,"carbs":1,"fat":6,"cooking":"grilled","ref":"Anticucho - Chilean asado - offal"},
  {"id":"cl_prieta_papas_light","nameAr":"مقلاة لحم بقري وبطاطس تشيلية خفيفة","nameEn":"Chilean beef and potato skillet light","mealType":"side","grams":120,"kcal":145,"protein":6,"carbs":12,"fat":7,"cooking":"pan","ref":"Beef and potato skillet - Chilean"},
  {"id":"cl_cordero_palo_light2","nameAr":"كورديرو بالو خروف عصا لايت تشيلي 2","nameEn":"Cordero palo lamb stick light Chilean 2","mealType":"lunch","grams":150,"kcal":235,"protein":20,"carbs":0,"fat":16,"cooking":"grilled","ref":"Cordero al palo - Patagonia 2"},
  {"id":"cl_curanto_olla_light","nameAr":"كورانتو أويا قدر لايت تشيلي","nameEn":"Curanto olla pot light Chilean","mealType":"lunch","grams":250,"kcal":195,"protein":14,"carbs":14,"fat":7,"cooking":"boiled","ref":"Curanto en olla - Chiloé - Hernández 2023"},
  {"id":"cl_cazuela_pava_light","nameAr":"كازويلا بافا ديك رومي خضار لايت تشيلية","nameEn":"Cazuela pava turkey veg light Chilean","mealType":"lunch","grams":300,"kcal":165,"protein":12,"carbs":14,"fat":5,"cooking":"boiled","ref":"Cazuela de pava - Mapuche - Christmas - Hernández"},
  {"id":"cl_cazuela_cordero_light","nameAr":"كازويلا كورديرو خروف خضار لايت تشيلية","nameEn":"Cazuela cordero lamb veg light Chilean","mealType":"lunch","grams":300,"kcal":185,"protein":14,"carbs":14,"fat":6,"cooking":"boiled","ref":"Cazuela de cordero - Patagonia - Hernández"},
  {"id":"cl_estofado_vacuno_light_cl","nameAr":"إستوفادو فاكونو لحم يخنة لايت تشيلي","nameEn":"Estofado vacuno beef stew light Chilean","mealType":"lunch","grams":200,"kcal":185,"protein":14,"carbs":6,"fat":10,"cooking":"boiled","ref":"Estofado - Chilean home - Hernández"},
  {"id":"cl_garrón_light_cl","nameAr":"جارون ساق لحم لايت تشيلي","nameEn":"Garrón shank light Chilean","mealType":"lunch","grams":180,"kcal":195,"protein":18,"carbs":0,"fat":12,"cooking":"boiled","ref":"Garrón - Chilean - cazuela meat"},
  {"id":"cl_malaya_light_cl","nameAr":"مالايا لحم بطن لايت تشيلي","nameEn":"Malaya belly meat light Chilean","mealType":"side","grams":80,"kcal":145,"protein":12,"carbs":0.5,"fat":9,"cooking":"pan","ref":"Malaya - Chilean - beef belly"},
  {"id":"cl_asado_alemán_light","nameAr":"أسادو أليمان لحم مفروم لايت تشيلي","nameEn":"Asado alemán meatloaf light Chilean","mealType":"side","grams":100,"kcal":165,"protein":10,"carbs":4,"fat":10,"cooking":"oven","ref":"Asado alemán - Chilean German - meatloaf - Hernández"},
  {"id":"cl_pastel_papas_light_cl","nameAr":"باستيل باباس بطاطس لحم لايت تشيلي","nameEn":"Pastel papas potato meat light Chilean","mealType":"side","grams":150,"kcal":165,"protein":6,"carbs":18,"fat":6,"cooking":"oven","ref":"Pastel de papas - Chilean - Hernández 2023"},
  {"id":"cl_chupe_centolla_light","nameAr":"تشوبي سينتويا سلطعون ملكي لايت تشيلي","nameEn":"Chupe centolla king crab light Chilean","mealType":"side","grams":150,"kcal":145,"protein":12,"carbs":6,"fat":7,"cooking":"oven","ref":"Chupe de centolla - Patagonia - king crab - Hernández"},
  {"id":"cl_chupe_camarones_light_cl","nameAr":"تشوبي كامارونيس روبيان لايت تشيلي","nameEn":"Chupe camarones shrimp light Chilean","mealType":"side","grams":150,"kcal":145,"protein":10,"carbs":8,"fat":7,"cooking":"oven","ref":"Chupe de camarones - Chilean - northern"},
  {"id":"cl_mote_huesillo_light_cl","nameAr":"موتي هويسيو لايت تشيلي","nameEn":"Mote huesillo light Chilean","mealType":"side","grams":150,"kcal":75,"protein":1,"carbs":18,"fat":0.2,"cooking":"boiled","ref":"Mote con huesillo light - Chilean national 2"},
  {"id":"cl_sopaipillas_pasadas_light","nameAr":"سوبايبياس باساداس شربات لايت تشيلية 1","nameEn":"Sopaipillas pasadas syrup light Chilean 1","mealType":"side","grams":60,"kcal":115,"protein":1.5,"carbs":20,"fat":2.5,"cooking":"oven","ref":"Sopaipillas pasadas - chancaca - Chilean - Hernández light"},
  {"id":"cl_calzones_rotos_light_40","nameAr":"كالزونيس روتوس حلوى لايت تشيلية 40جم","nameEn":"Calzones rotos sweet light Chilean 40g","mealType":"side","grams":40,"kcal":95,"protein":1.5,"carbs":14,"fat":3.5,"cooking":"oven","ref":"Calzones rotos - Chilean - Hernández light"},
  {"id":"cl_kuchen_manzana_light_80_cl","nameAr":"كوتشن مانزانا تفاح لايت تشيلي 80جم","nameEn":"Kuchen manzana apple light Chilean 80g","mealType":"side","grams":80,"kcal":135,"protein":2,"carbs":20,"fat":4,"cooking":"baked","ref":"Kuchen de manzana - German Chilean - south - Frutillar IGP"},
  {"id":"cl_strudel_manzana_light_60_cl","nameAr":"سترودل تفاح لايت تشيلي 60جم","nameEn":"Strudel manzana apple light Chilean 60g","mealType":"side","grams":60,"kcal":115,"protein":1.5,"carbs":16,"fat":4,"cooking":"baked","ref":"Strudel - German Chilean - southern Chile"},
  {"id":"cl_berlin_chileno_light_60","nameAr":"برلين تشيلي دونات لايت 60جم","nameEn":"Berlín chileno donut light Chilean 60g","mealType":"side","grams":60,"kcal":135,"protein":2.5,"carbs":18,"fat":5,"cooking":"oven","ref":"Berlín - Chilean Berliner - Hernández light"},
  {"id":"cl_cuchuflí_manjar_light_20","nameAr":"كوتشوفلي مانجار لايت تشيلي 20جم","nameEn":"Cuchuflí manjar light Chilean 20g","mealType":"side","grams":20,"kcal":65,"protein":0.5,"carbs":10,"fat":2,"cooking":"fresh","ref":"Cuchuflí - Chilean - manjar - national sweet"},
  {"id":"cl_manjar_20_cl","nameAr":"مانجار دولسي دي ليتشي تشيلي 20جم","nameEn":"Manjar dulce leche Chilean 20g","mealType":"side","grams":20,"kcal":65,"protein":1,"carbs":8,"fat":2.5,"cooking":"fresh","ref":"Manjar - national sweet Chile - famous 2024"},
  {"id":"cl_dulce_alcayota_40","nameAr":"دولسي ألكايوتا قرع حلو تشيلي 40جم","nameEn":"Dulce alcayota pumpkin sweet Chilean 40g","mealType":"side","grams":40,"kcal":55,"protein":0.3,"carbs":12,"fat":0.1,"cooking":"boiled","ref":"Dulce de alcayota - Chilean - traditional sweet"},
  {"id":"cl_murra_con_mote_light","nameAr":"مورا كون موتي توت قمح لايت تشيلي","nameEn":"Murra con mote berry wheat light Chilean","mealType":"side","grams":120,"kcal":65,"protein":1.5,"carbs":12,"fat":0.5,"cooking":"fresh","ref":"Murra con mote - Chilean - mote"},
];

const REGION_HINTS: [string, RegExp][] = [
  ['magallanes', /magallanes|patagonia/],
  ['valparaiso', /valparaiso/],
  ['santiago', /santiago/],
  ['arica', /arica/],
  ['atacama', /atacama/],
  ['coquimbo', /coquimbo/],
  ['maule', /maule/],
  ['bio_bio', /bio.?bio/],
  ['araucania', /araucania/],
  ['los_lagos', /los lagos|chiloe|puerto montt/],
  ['aysen', /aysen/],
];

function supplementalRegion(dish: LegacyChileanDish): string {
  const text = `${dish.nameEn} ${dish.ref ?? ''}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  return REGION_HINTS.find(([, pattern]) => pattern.test(text))?.[0] ?? 'pan_chilean';
}

function supplementalCategory(dish: LegacyChileanDish): string {
  const name = dish.nameEn.toLowerCase();
  if (dish.mealType === 'breakfast') return 'breakfast_items';
  if (/fish|seafood|shrimp|crab|clam|abalone|conger|eel|reineta|salmon|tuna|machas|locos|centolla|erizo|jaiba|mariscos|camarones/.test(name)) return 'fish_seafood';
  if (dish.mealType === 'salad') return 'salads';
  if (dish.mealType === 'fruit') return 'fruits';
  if (/sweet|syrup|alfajor|kuchen|strudel|donut|cuchufli|manjar|dulce/.test(name)) return 'rice_cakes_sweets';
  if (/bread|empanada|completo|chaparrita|choripan|sopaipilla|hot dog/.test(name)) return 'street_snacks';
  if (/chicken|turkey|poultry|ave|pava/.test(name)) return 'poultry_mains';
  if (/beef|meat|steak|lamb|cordero|longaniza|anticucho|chunchules/.test(name)) return 'meat_mains';
  return 'vegetable_mains';
}

const CHILEAN_LOCALIZED_NAMES: Record<string, Pick<ChileanFullDish, 'nameFr' | 'nameEs' | 'nameDe'>> = {
  cl_marRaqueta_60: { nameFr: 'Pain marraqueta chilien (60 g)', nameEs: 'Pan marraqueta chileno (60 g)', nameDe: 'Chilenisches Marraqueta-Brot (60 g)' },
  cl_hallulla_60: { nameFr: 'Pain hallulla chilien (60 g)', nameEs: 'Pan hallulla chileno (60 g)', nameDe: 'Chilenisches Hallulla-Brot (60 g)' },
  cl_pan_amasado_60: { nameFr: 'Pain paysan pan amasado chilien (60 g)', nameEs: 'Pan amasado chileno (60 g)', nameDe: 'Chilenisches Pan-Amasado-Bauernbrot (60 g)' },
  cl_huevos_revuelTos_cl: { nameFr: 'Œufs brouillés à la chilienne', nameEs: 'Huevos revueltos chilenos', nameDe: 'Chilenisches Rührei' },
  cl_palta_toast_light: { nameFr: 'Toast léger à l’avocat chilien', nameEs: 'Tostada chilena ligera de palta', nameDe: 'Leichter chilenischer Avocado-Toast' },
  cl_cafe_chile: { nameFr: 'Café chilien', nameEs: 'Café chileno', nameDe: 'Chilenischer Kaffee' },
  cl_jugo_naranja_cl_200: { nameFr: 'Jus d’orange chilien (200 ml)', nameEs: 'Jugo de naranja chileno (200 ml)', nameDe: 'Chilenischer Orangensaft (200 ml)' },
  cl_yogurt_cl: { nameFr: 'Yaourt chilien du petit-déjeuner', nameEs: 'Yogur chileno para el desayuno', nameDe: 'Chilenischer Frühstücksjoghurt' },
  cl_cazuela_vacuno_light: { nameFr: 'Cazuela légère au bœuf et aux légumes', nameEs: 'Cazuela ligera de vacuno con verduras', nameDe: 'Leichte Rindfleisch-Cazuela mit Gemüse' },
  cl_cazuela_ave_light: { nameFr: 'Cazuela légère au poulet et aux légumes', nameEs: 'Cazuela ligera de ave con verduras', nameDe: 'Leichte Hähnchen-Cazuela mit Gemüse' },
  cl_pastel_choclo_light: { nameFr: 'Pastel de choclo léger au maïs et au bœuf', nameEs: 'Pastel de choclo ligero con maíz y vacuno', nameDe: 'Leichter Pastel de Choclo mit Mais und Rindfleisch' },
  cl_empanada_pino_light_1: { nameFr: 'Empanada pino légère au bœuf et à l’oignon', nameEs: 'Empanada de pino ligera con vacuno y cebolla', nameDe: 'Leichte Pino-Empanada mit Rindfleisch und Zwiebeln' },
  cl_empanada_queso_light_1_cl: { nameFr: 'Empanada légère au fromage', nameEs: 'Empanada chilena ligera de queso', nameDe: 'Leichte chilenische Käse-Empanada' },
  cl_completo_light: { nameFr: 'Completo chilien léger', nameEs: 'Completo chileno ligero', nameDe: 'Leichter chilenischer Completo' },
  cl_chorrillana_light: { nameFr: 'Chorrillana légère aux frites, à la viande et à l’œuf', nameEs: 'Chorrillana ligera con papas, carne y huevo', nameDe: 'Leichte Chorrillana mit Pommes, Fleisch und Ei' },
  cl_lomo_vetado_grill_light: { nameFr: 'Steak lomo vetado grillé léger', nameEs: 'Lomo vetado a la parrilla ligero', nameDe: 'Leichtes gegrilltes Lomo-Vetado-Steak' },
  cl_asado_tira_light: { nameFr: 'Travers de bœuf asado de tira grillés légers', nameEs: 'Asado de tira ligero a la parrilla', nameDe: 'Leichte gegrillte Rinderrippen Asado de Tira' },
  cl_cordero_magallanico_grill: { nameFr: 'Agneau magellanique grillé de Patagonie', nameEs: 'Cordero magallánico a la parrilla de la Patagonia', nameDe: 'Gegrilltes magellanisches Patagonien-Lamm' },
  cl_curanto_hoyO_light: { nameFr: 'Curanto en hoyo léger aux fruits de mer et à la viande', nameEs: 'Curanto en hoyo ligero con mariscos y carne', nameDe: 'Leichtes Curanto en Hoyo mit Meeresfrüchten und Fleisch' },
  cl_paila_marina_light: { nameFr: 'Soupe légère de fruits de mer paila marina', nameEs: 'Sopa ligera de mariscos paila marina', nameDe: 'Leichte Meeresfrüchtesuppe Paila Marina' },
  cl_caldiLLo_congrio_light: { nameFr: 'Soupe légère de congre caldillo de congrio', nameEs: 'Caldillo ligero de congrio', nameDe: 'Leichte Congrio-Suppe Caldillo de Congrio' },
  cl_chupe_jaiba_light: { nameFr: 'Chupe léger de crabe jaiba gratiné', nameEs: 'Chupe ligero gratinado de jaiba', nameDe: 'Leichtes überbackenes Jaiba-Krabben-Chupe' },
  cl_chupe_locos_light: { nameFr: 'Chupe léger de locos (abalone chilien)', nameEs: 'Chupe ligero de locos chilenos', nameDe: 'Leichtes Locos-Chupe (chilenische Seeohren)' },
  cl_machas_parmesana_light: { nameFr: 'Machas légères au parmesan', nameEs: 'Machas ligeras a la parmesana', nameDe: 'Leichte Machas mit Parmesan' },
  cl_cebiche_chileno_light: { nameFr: 'Ceviche chilien léger', nameEs: 'Ceviche chileno ligero', nameDe: 'Leichtes chilenisches Ceviche' },
  cl_charquican_light: { nameFr: 'Charquicán léger à la viande et aux légumes', nameEs: 'Charquicán ligero de carne y verduras', nameDe: 'Leichter Charquicán mit Fleisch und Gemüse' },
  cl_tomatican_light: { nameFr: 'Tomaticán léger à la viande et à la tomate', nameEs: 'Tomaticán ligero de carne y tomate', nameDe: 'Leichter Tomaticán mit Fleisch und Tomaten' },
  cl_locos_mayo_light: { nameFr: 'Locos légers à la mayonnaise', nameEs: 'Locos ligeros con mayonesa', nameDe: 'Leichte Locos mit Mayonnaise' },
  cl_beef_boiled_cl: { nameFr: 'Bœuf chilien bouilli', nameEs: 'Vacuno chileno hervido', nameDe: 'Gekochtes chilenisches Rindfleisch' },
  cl_ch_breast_grill_cl: { nameFr: 'Poitrine de poulet grillée chilienne', nameEs: 'Pechuga de pollo chilena a la parrilla', nameDe: 'Gegrillte chilenische Hähnchenbrust' },
  cl_pork_grill_cl: { nameFr: 'Steak de bœuf chilien grillé', nameEs: 'Corte de vacuno chileno a la parrilla', nameDe: 'Gegrilltes chilenisches Rindersteak' },
  cl_congrio_grill_cl: { nameFr: 'Congre chilien grillé', nameEs: 'Congrio chileno a la parrilla', nameDe: 'Gegrillter chilenischer Congrio' },
  cl_reineta_grill_cl: { nameFr: 'Poisson reineta chilien grillé', nameEs: 'Reineta chilena a la parrilla', nameDe: 'Gegrillter chilenischer Reineta-Fisch' },
  cl_salmon_grill_cl: { nameFr: 'Saumon chilien grillé', nameEs: 'Salmón chileno a la parrilla', nameDe: 'Gegrillter chilenischer Lachs' },
  cl_centolla_light_100: { nameFr: 'Centolla (crabe royal) légère (100 g)', nameEs: 'Centolla ligera (cangrejo real, 100 g)', nameDe: 'Leichte Centolla (Königskrabbe, 100 g)' },
  cl_erizo_60: { nameFr: 'Oursin chilien (60 g)', nameEs: 'Erizo chileno (60 g)', nameDe: 'Chilenischer Seeigel (60 g)' },
  cl_arroz_blanco_cl: { nameFr: 'Riz blanc chilien', nameEs: 'Arroz blanco chileno', nameDe: 'Chilenischer weißer Reis' },
  cl_papas_fritas_cl_light: { nameFr: 'Frites chiliennes légères au four', nameEs: 'Papas fritas chilenas ligeras al horno', nameDe: 'Leichte chilenische Ofenpommes' },
  cl_papas_doradas_cl: { nameFr: 'Pommes de terre dorées à la chilienne', nameEs: 'Papas doradas chilenas', nameDe: 'Chilenische goldbraune Kartoffeln' },
  cl_pure_papas_cl: { nameFr: 'Purée de pommes de terre chilienne', nameEs: 'Puré de papas chileno', nameDe: 'Chilenisches Kartoffelpüree' },
  cl_mote_100_cl: { nameFr: 'Blé mote décortiqué chilien (100 g)', nameEs: 'Mote de trigo pelado chileno (100 g)', nameDe: 'Chilenischer geschälter Weizen-Mote (100 g)' },
  cl_pebre_30: { nameFr: 'Sauce pebre chilienne (30 g)', nameEs: 'Salsa pebre chilena (30 g)', nameDe: 'Chilenische Pebre-Sauce (30 g)' },
  cl_chancho_piedra_30: { nameFr: 'Sauce tomate chilienne chancho en piedra (30 g)', nameEs: 'Salsa chilena chancho en piedra (30 g)', nameDe: 'Chilenische Tomatensauce Chancho en Piedra (30 g)' },
  cl_mayo_casera_20: { nameFr: 'Mayonnaise maison chilienne (20 g)', nameEs: 'Mayonesa casera chilena (20 g)', nameDe: 'Chilenische hausgemachte Mayonnaise (20 g)' },
  cl_palta_hass_60: { nameFr: 'Avocat Hass chilien (60 g)', nameEs: 'Palta Hass chilena (60 g)', nameDe: 'Chilenische Hass-Avocado (60 g)' },
  cl_longaniza_chillan_40: { nameFr: 'Longaniza de bœuf halal de Chillán (40 g)', nameEs: 'Longaniza de vacuno halal de Chillán (40 g)', nameDe: 'Halal-Rinderlonganiza aus Chillán (40 g)' },
  cl_prieta_40: { nameFr: 'Galette de bœuf grillée chilienne (40 g)', nameEs: 'Hamburguesa de vacuno chilena a la parrilla (40 g)', nameDe: 'Gegrilltes chilenisches Rindfleischpatty (40 g)' },
  cl_chunchules_40_cl: { nameFr: 'Chunchules (intestins) frits chiliens (40 g)', nameEs: 'Chunchules chilenos fritos (40 g)', nameDe: 'Frittierte chilenische Chunchules (40 g)' },
  cl_sopaipillas_light_1_cl: { nameFr: 'Sopaipillas légères à la courge (1)', nameEs: 'Sopaipillas ligeras de zapallo (1)', nameDe: 'Leichte Sopaipillas mit Kürbis (1)' },
  cl_chaparritas_light_1: { nameFr: 'Chaparrita chilienne légère au bœuf et au fromage (1)', nameEs: 'Chaparrita chilena ligera de vacuno y queso (1)', nameDe: 'Leichte chilenische Chaparrita mit Rind und Käse (1)' },
  cl_ensalada_chilena: { nameFr: 'Salade chilienne de tomates et d’oignons', nameEs: 'Ensalada chilena de tomate y cebolla', nameDe: 'Chilenischer Tomaten-Zwiebel-Salat' },
  cl_ensalada_chilena_palta: { nameFr: 'Salade chilienne à l’avocat', nameEs: 'Ensalada chilena con palta', nameDe: 'Chilenischer Salat mit Avocado' },
  cl_ensalada_surtida_cl: { nameFr: 'Salade composée chilienne', nameEs: 'Ensalada surtida chilena', nameDe: 'Chilenischer gemischter Salat' },
  cl_palta_reina_light: { nameFr: 'Palta reina légère (avocat farci)', nameEs: 'Palta reina ligera (aguacate relleno)', nameDe: 'Leichte Palta Reina (gefüllte Avocado)' },
  cl_tomate_relleno_light_cl: { nameFr: 'Tomate farcie légère à la chilienne', nameEs: 'Tomate relleno chileno ligero', nameDe: 'Leichte chilenische gefüllte Tomate' },
  cl_carbonada_light: { nameFr: 'Soupe carbonada légère à la viande et aux légumes', nameEs: 'Sopa carbonada ligera de carne y verduras', nameDe: 'Leichte Carbonada-Suppe mit Fleisch und Gemüse' },
  cl_porotos_granados_light: { nameFr: 'Porotos granados légers aux haricots, maïs et courge', nameEs: 'Porotos granados ligeros con porotos, maíz y zapallo', nameDe: 'Leichte Porotos Granados mit Bohnen, Mais und Kürbis' },
  cl_lentejas_cl_light: { nameFr: 'Soupe légère de lentilles chilienne', nameEs: 'Sopa chilena ligera de lentejas', nameDe: 'Leichte chilenische Linsensuppe' },
  cl_tortilla_huevo_cl: { nameFr: 'Tortilla chilienne aux œufs', nameEs: 'Tortilla chilena de huevo', nameDe: 'Chilenisches Eieromelett' },
  cl_egg_boiled_cl: { nameFr: 'Œufs durs chiliens', nameEs: 'Huevos duros chilenos', nameDe: 'Chilenische hartgekochte Eier' },
  cl_tuna_water_cl: { nameFr: 'Thon au naturel chilien', nameEs: 'Atún al agua chileno', nameDe: 'Chilenischer Thunfisch in Wasser' },
  cl_manzana_cl: { nameFr: 'Pomme chilienne', nameEs: 'Manzana chilena', nameDe: 'Chilenischer Apfel' },
  cl_uva_cl: { nameFr: 'Raisin chilien', nameEs: 'Uva chilena', nameDe: 'Chilenische Trauben' },
  cl_palta_fruit_cl: { nameFr: 'Avocat chilien', nameEs: 'Palta chilena', nameDe: 'Chilenische Avocado' },
  cl_chirimoya_150_cl: { nameFr: 'Chérimole chilienne (150 g)', nameEs: 'Chirimoya chilena (150 g)', nameDe: 'Chilenische Cherimoya (150 g)' },
  cl_mote_con_huesillo_light_200: { nameFr: 'Mote con huesillo léger (blé et pêche, 200 ml)', nameEs: 'Mote con huesillo ligero (trigo y durazno, 200 ml)', nameDe: 'Leichtes Mote con Huesillo (Weizen und Pfirsich, 200 ml)' },
  cl_leche_asada_light_80: { nameFr: 'Leche asada légère, flan chilien (80 g)', nameEs: 'Leche asada ligera, flan chileno (80 g)', nameDe: 'Leichte Leche Asada, chilenischer Flan (80 g)' },
  cl_alfajor_chileno_light_40: { nameFr: 'Alfajor chilien léger (40 g)', nameEs: 'Alfajor chileno ligero (40 g)', nameDe: 'Leichter chilenischer Alfajor (40 g)' },
  cl_empanada_mariscos_light_1: { nameFr: 'Empanada légère aux fruits de mer (1)', nameEs: 'Empanada ligera de mariscos (1)', nameDe: 'Leichte Meeresfrüchte-Empanada (1)' },
  cl_empanada_pino_masa_light_1: { nameFr: 'Pâte légère pour empanada pino (1)', nameEs: 'Masa ligera para empanada de pino (1)', nameDe: 'Leichter Teig für Empanada Pino (1)' },
  cl_humitas_light_1_cl: { nameFr: 'Humitas légères au maïs (1)', nameEs: 'Humitas ligeras de maíz (1)', nameDe: 'Leichte Mais-Humitas (1)' },
  cl_pastel_jaiba_light_cl: { nameFr: 'Pastel léger de crabe jaiba chilien', nameEs: 'Pastel ligero chileno de jaiba', nameDe: 'Leichter chilenischer Jaiba-Krabbenkuchen' },
  cl_bistec_pobre_light: { nameFr: 'Bistec a lo pobre léger au steak, œuf et pommes de terre', nameEs: 'Bistec a lo pobre ligero con bistec, huevo y papas', nameDe: 'Leichtes Bistec a lo Pobre mit Steak, Ei und Kartoffeln' },
  cl_a_lo_pobre_light: { nameFr: 'Steak a lo pobre léger chilien (2)', nameEs: 'Bistec a lo pobre ligero chileno (2)', nameDe: 'Leichtes chilenisches Steak a lo Pobre (2)' },
  cl_lomo_saltado_cl_light: { nameFr: 'Lomo saltado léger chilien', nameEs: 'Lomo saltado chileno ligero', nameDe: 'Leichtes chilenisches Lomo Saltado' },
  cl_pichanga_light: { nameFr: 'Pichanga légère, assortiment apéritif chilien', nameEs: 'Pichanga ligera, aperitivo chileno surtido', nameDe: 'Leichte Pichanga, chilenischer Vorspeisenteller' },
  cl_choripan_light_cl: { nameFr: 'Sandwich choripán chilien léger au bœuf halal', nameEs: 'Sándwich choripán chileno ligero de vacuno halal', nameDe: 'Leichtes chilenisches Choripán-Sandwich mit Halal-Rind' },
  cl_anticucho_cl_light: { nameFr: 'Anticucho chilien léger à la viande', nameEs: 'Anticucho chileno ligero de carne', nameDe: 'Leichtes chilenisches Anticucho mit Fleisch' },
  cl_prieta_papas_light: { nameFr: 'Poêlée chilienne légère de bœuf et pommes de terre', nameEs: 'Salteado chileno ligero de vacuno y papas', nameDe: 'Leichte chilenische Rindfleisch-Kartoffel-Pfanne' },
  cl_cordero_palo_light2: { nameFr: 'Agneau au bâton cordero al palo léger (2)', nameEs: 'Cordero al palo ligero (2)', nameDe: 'Leichtes Cordero al Palo (2)' },
  cl_curanto_olla_light: { nameFr: 'Curanto en olla léger chilien', nameEs: 'Curanto en olla chileno ligero', nameDe: 'Leichtes chilenisches Curanto en Olla' },
  cl_cazuela_pava_light: { nameFr: 'Cazuela légère à la dinde et aux légumes', nameEs: 'Cazuela ligera de pava con verduras', nameDe: 'Leichte Puten-Cazuela mit Gemüse' },
  cl_cazuela_cordero_light: { nameFr: 'Cazuela légère à l’agneau et aux légumes', nameEs: 'Cazuela ligera de cordero con verduras', nameDe: 'Leichte Lamm-Cazuela mit Gemüse' },
  cl_estofado_vacuno_light_cl: { nameFr: 'Estofado léger de bœuf chilien', nameEs: 'Estofado chileno ligero de vacuno', nameDe: 'Leichter chilenischer Rindfleischeintopf' },
  cl_garrón_light_cl: { nameFr: 'Jarret de bœuf chilien léger', nameEs: 'Garrón de vacuno chileno ligero', nameDe: 'Leichte chilenische Rinderhaxe' },
  cl_malaya_light_cl: { nameFr: 'Poitrine de bœuf malaya légère', nameEs: 'Malaya de vacuno chilena ligera', nameDe: 'Leichtes chilenisches Rinderbauchstück Malaya' },
  cl_asado_alemán_light: { nameFr: 'Pain de viande asado alemán léger', nameEs: 'Asado alemán ligero de carne', nameDe: 'Leichter chilenischer Hackbraten Asado Alemán' },
  cl_pastel_papas_light_cl: { nameFr: 'Pastel chilien léger aux pommes de terre et à la viande', nameEs: 'Pastel chileno ligero de papas y carne', nameDe: 'Leichter chilenischer Kartoffel-Fleisch-Auflauf' },
  cl_chupe_centolla_light: { nameFr: 'Chupe léger de centolla (crabe royal)', nameEs: 'Chupe ligero de centolla (cangrejo real)', nameDe: 'Leichtes Centolla-Chupe (Königskrabbe)' },
  cl_chupe_camarones_light_cl: { nameFr: 'Chupe léger aux crevettes chiliennes', nameEs: 'Chupe chileno ligero de camarones', nameDe: 'Leichtes chilenisches Garnelen-Chupe' },
  cl_mote_huesillo_light_cl: { nameFr: 'Mote huesillo léger chilien', nameEs: 'Mote huesillo chileno ligero', nameDe: 'Leichtes chilenisches Mote Huesillo' },
  cl_sopaipillas_pasadas_light: { nameFr: 'Sopaipillas légères au sirop (1)', nameEs: 'Sopaipillas pasadas ligeras en almíbar (1)', nameDe: 'Leichte Sopaipillas in Sirup (1)' },
  cl_calzones_rotos_light_40: { nameFr: 'Calzones rotos sucrés légers (40 g)', nameEs: 'Calzones rotos dulces ligeros (40 g)', nameDe: 'Leichte süße Calzones Rotos (40 g)' },
  cl_kuchen_manzana_light_80_cl: { nameFr: 'Kuchen chilien léger aux pommes (80 g)', nameEs: 'Kuchen chileno ligero de manzana (80 g)', nameDe: 'Leichter chilenischer Apfelkuchen (80 g)' },
  cl_strudel_manzana_light_60_cl: { nameFr: 'Strudel chilien léger aux pommes (60 g)', nameEs: 'Strudel chileno ligero de manzana (60 g)', nameDe: 'Leichter chilenischer Apfelstrudel (60 g)' },
  cl_berlin_chileno_light_60: { nameFr: 'Beignet berlinois chilien léger (60 g)', nameEs: 'Berlín chileno ligero (60 g)', nameDe: 'Leichter chilenischer Berliner (60 g)' },
  cl_cuchuflí_manjar_light_20: { nameFr: 'Cuchuflí léger au manjar (20 g)', nameEs: 'Cuchuflí ligero de manjar (20 g)', nameDe: 'Leichter Cuchuflí mit Manjar (20 g)' },
  cl_manjar_20_cl: { nameFr: 'Manjar chilien, dulce de leche (20 g)', nameEs: 'Manjar chileno, dulce de leche (20 g)', nameDe: 'Chilenischer Manjar, Milchkaramell (20 g)' },
  cl_dulce_alcayota_40: { nameFr: 'Confiture sucrée chilienne d’alcayota (40 g)', nameEs: 'Dulce chileno de alcayota (40 g)', nameDe: 'Chilenische Alcayota-Kürbiskonfitüre (40 g)' },
  cl_murra_con_mote_light: { nameFr: 'Murra légère aux baies et au mote chilien', nameEs: 'Murra ligera con mote chileno', nameDe: 'Leichte chilenische Murra mit Beeren und Mote' },
};

export const CHILEAN_FULL: ChileanFullDish[] = CHILEAN_FULL_RAW.map((dish) => {
  const localizedNames = CHILEAN_LOCALIZED_NAMES[dish.id];
  if (!localizedNames) throw new Error(`Missing supplemental translations for ${dish.id}`);
  return {
    ...dish,
    ...localizedNames,
    category: supplementalCategory(dish),
    region: supplementalRegion(dish),
    diaspora_priority: ['chilean', 'south_american', 'latin_american', 'chilean_cuisine'],
    kcal: Math.round(4 * dish.protein + 4 * dish.carbs + 9 * dish.fat),
  };
});
