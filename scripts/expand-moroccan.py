# -*- coding: utf-8 -*-
"""Expand src/data/moroccan-full-100-USDA.json from 100 to 200+ dishes.
Adds realistic variants of existing dishes (base referenced by Arabic name);
existing dishes are left untouched."""
import json
import os
import sys

PROJECT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON = os.path.join(PROJECT, "src", "data", "moroccan-full-100-USDA.json")

# per-100g macro deltas: (dp, dc, df) -> cal delta = 4*dp+4*dc+9*df
# d_fiber, d_sugar, d_sodium are per-100g columns
# sat: override sat factor; sweet: force is_sweet; meals: override mealTypes
V = [
    # ---------------- COUSCOUS ----------------
    dict(base="كسكسي بلحم الخروف", ar="كسكسي بلحم البقر", en="Couscous with Beef", fr="Couscous au Bœuf", es="Cuscús con Ternera", de="Couscous mit Rindfleisch", d=(1, 0, -1, 0, 0, 0)),
    dict(base="كسكسي بلحم الخروف", ar="كسكسي بلحم الخروف والحمص", en="Couscous with Lamb and Chickpeas", fr="Couscous à l'Agneau et Pois Chiches", es="Cuscús con Cordero y Garbanzos", de="Couscous mit Lamm und Kichererbsen", d=(2, 6, 0.5, 2, 0, 0)),
    dict(base="كسكسي بلحم الخروف", ar="كسكسي بلحم الخروف والزبيب", en="Couscous with Lamb and Raisins", fr="Couscous à l'Agneau aux Raisins", es="Cuscús con Cordero y Pasas", de="Couscous mit Lamm und Rosinen", d=(1, 5, 0, 0.5, 6, 0)),
    dict(base="كسكسي بلحم الخروف", ar="كسكسي بلحم الخروف والقرع", en="Couscous with Lamb and Pumpkin", fr="Couscous à l'Agneau et Potiron", es="Cuscús con Cordero y Calabaza", de="Couscous mit Lamm und Kürbis", d=(0, 3, 0, 1, 0, 0)),
    dict(base="كسكسي بلحم الخروف", ar="كسكسي بلحم الخروف والجزر والكوسة", en="Couscous with Lamb, Carrots and Zucchini", fr="Couscous à l'Agneau, Carottes et Courgettes", es="Cuscús con Cordero, Zanahorias y Calabacín", de="Couscous mit Lamm, Karotten und Zucchini", d=(0, 4, 0, 1.5, 0, 0)),
    dict(base="كسكسي بلحم الخروف", ar="كسكسي بلحم الخروف بالزيتون", en="Couscous with Lamb and Olives", fr="Couscous à l'Agneau aux Olives", es="Cuscús con Cordero y Aceitunas", de="Couscous mit Lamm und Oliven", d=(1, 1, 1, 0, 0, 90)),
    dict(base="كسكسي بالدجاج", ar="كسكسي بالدجاج والزبيب", en="Couscous with Chicken and Raisins", fr="Couscous au Poulet aux Raisins", es="Cuscús con Pollo y Pasas", de="Couscous mit Hähnchen und Rosinen", d=(2, 3, 0, 0.5, 5, 0)),
    dict(base="كسكسي بالدجاج", ar="كسكسي بالدجاج والحمص", en="Couscous with Chicken and Chickpeas", fr="Couscous au Poulet et Pois Chiches", es="Cuscús con Pollo y Garbanzos", de="Couscous mit Hähnchen und Kichererbsen", d=(2, 6, 0.5, 2, 0, 0)),
    dict(base="كسكسي بالدجاج", ar="كسكسي بالدجاج والجزر والزيتون", en="Couscous with Chicken, Carrots and Olives", fr="Couscous au Poulet, Carottes et Olives", es="Cuscús con Pollo, Zanahorias y Aceitunas", de="Couscous mit Hähnchen, Karotten und Oliven", d=(1, 3, 1, 1, 0, 80)),
    dict(base="كسكسي بالدجاج", ar="كسكسي بالدجاج والخضروات", en="Couscous with Chicken and Vegetables", fr="Couscous au Poulet aux Légumes", es="Cuscús con Pollo y Verduras", de="Couscous mit Hähnchen und Gemüse", d=(0, 3, 0, 1, 0, 0)),
    dict(base="كسكسي بالسمك", ar="كسكسي بالسمك والخضروات", en="Couscous with Fish and Vegetables", fr="Couscous au Poisson aux Légumes", es="Cuscús con Pescado y Verduras", de="Couscous mit Fisch und Gemüse", d=(0, 3, 0, 1, 0, 0)),
    dict(base="كسكسي بالسمك", ar="كسكسي بالسمك والجزر والكوسة", en="Couscous with Fish, Carrots and Zucchini", fr="Couscous au Poisson, Carottes et Courgettes", es="Cuscús con Pescado, Zanahorias y Calabacín", de="Couscous mit Fisch, Karotten und Zucchini", d=(0, 4, 0, 1.5, 0, 0)),
    dict(base="كسكسي بالخضروات", ar="كسكسي بالخضروات والحمص", en="Vegetable Couscous with Chickpeas", fr="Couscous aux Légumes et Pois Chiches", es="Cuscús de Verduras con Garbanzos", de="Gemüse-Couscous mit Kichererbsen", d=(3, 6, 0.5, 2, 0, 0)),
    dict(base="كسكسي بالخضروات", ar="كسكسي بالخضروات والفول الأخضر", en="Vegetable Couscous with Green Beans", fr="Couscous aux Légumes et Haricots Verts", es="Cuscús de Verduras con Judías Verdes", de="Gemüse-Couscous mit grünen Bohnen", d=(2, 4, 0, 1.5, 0, 0)),
    dict(base="كسكسي بالخضروات", ar="كسكسي بالخضروات والقرع والجزر", en="Vegetable Couscous with Pumpkin and Carrots", fr="Couscous aux Légumes, Potiron et Carottes", es="Cuscús de Verduras con Calabaza y Zanahorias", de="Gemüse-Couscous mit Kürbis und Karotten", d=(0, 5, 0, 2, 0, 0)),
    dict(base="كسكسي بالخضروات", ar="كسكسي بالخضروات والخرشوف", en="Vegetable Couscous with Artichokes", fr="Couscous aux Légumes et Artichauts", es="Cuscús de Verduras con Alcachofas", de="Gemüse-Couscous mit Artischocken", d=(1, 3, 0, 2, 0, 0)),
    dict(base="كسكسي بالخضروات السبعة", ar="كسكسي بالخضروات السبعة بالحمص", en="Seven-Vegetable Couscous with Chickpeas", fr="Couscous aux Sept Légumes et Pois Chiches", es="Cuscús de Siete Verduras con Garbanzos", de="Sieben-Gemüse-Couscous mit Kichererbsen", d=(3, 5, 0.5, 2, 0, 0)),
    dict(base="كسكسي تفاية", ar="كسكسي تفاية باللوز والزبيب", en="Couscous Tfaya with Almonds and Raisins", fr="Couscous Tfaya aux Amandes et Raisins", es="Cuscús Tfaya con Almendras y Pasas", de="Couscous Tfaya mit Mandeln und Rosinen", d=(2, 3, 2, 0.5, 3, 0)),
    dict(base="كسكسي تفاية", ar="كسكسي تفاية بالدجاج", en="Couscous Tfaya with Chicken", fr="Couscous Tfaya au Poulet", es="Cuscús Tfaya con Pollo", de="Couscous Tfaya mit Hähnchen", d=(5, 0, 1.5, 0, 0, 0)),
    # ---------------- TAJINES ----------------
    dict(base="طاجين لحم", ar="طاجين لحم بالزبيب", en="Lamb Tajine with Raisins", fr="Tajine d'Agneau aux Raisins", es="Tajine de Cordero con Pasas", de="Lamm-Tajine mit Rosinen", d=(2, 2, 0, 0.5, 6, 0)),
    dict(base="طاجين لحم", ar="طاجين لحم بالزيتون", en="Lamb Tajine with Olives", fr="Tajine d'Agneau aux Olives", es="Tajine de Cordero con Aceitunas", de="Lamm-Tajine mit Oliven", d=(1, 1, 1, 0, 0, 80)),
    dict(base="طاجين لحم", ar="طاجين لحم بالبطاطس والزيتون", en="Lamb Tajine with Potatoes and Olives", fr="Tajine d'Agneau aux Pommes de Terre et Olives", es="Tajine de Cordero con Patatas y Aceitunas", de="Lamm-Tajine mit Kartoffeln und Oliven", d=(2, 6, 1, 1, 0, 80)),
    dict(base="طاجين لحم", ar="طاجين لحم بالقرع والجزر", en="Lamb Tajine with Pumpkin and Carrots", fr="Tajine d'Agneau au Potiron et Carottes", es="Tajine de Cordero con Calabaza y Zanahorias", de="Lamm-Tajine mit Kürbis und Karotten", d=(1, 5, 0, 2, 0, 0)),
    dict(base="طاجين لحم", ar="طاجين لحم بالحمص", en="Lamb Tajine with Chickpeas", fr="Tajine d'Agneau aux Pois Chiches", es="Tajine de Cordero con Garbanzos", de="Lamm-Tajine mit Kichererbsen", d=(2, 5, 0.5, 2, 0, 0)),
    dict(base="طاجين دجاج", ar="طاجين دجاج بالزيتون والليمون المصير", en="Chicken Tajine with Olives and Preserved Lemon", fr="Tajine de Poulet aux Olives et Citron Confit", es="Tajine de Pollo con Aceitunas y Limón Confitado", de="Hähnchen-Tajine mit Oliven und konservierter Zitrone", d=(2, 1, 1, 0, 0, 120)),
    dict(base="طاجين دجاج", ar="طاجين دجاج بالبطاطس والزيتون", en="Chicken Tajine with Potatoes and Olives", fr="Tajine de Poulet aux Pommes de Terre et Olives", es="Tajine de Pollo con Patatas y Aceitunas", de="Hähnchen-Tajine mit Kartoffeln und Oliven", d=(2, 8, 0.5, 1, 0, 70)),
    dict(base="طاجين دجاج", ar="طاجين دجاج بالخضروات", en="Chicken Tajine with Vegetables", fr="Tajine de Poulet aux Légumes", es="Tajine de Pollo con Verduras", de="Hähnchen-Tajine mit Gemüse", d=(1, 5, 0, 2, 0, 0)),
    dict(base="طاجين دجاج", ar="طاجين دجاج بالعسل واللوز", en="Chicken Tajine with Honey and Almonds", fr="Tajine de Poulet au Miel et aux Amandes", es="Tajine de Pollo con Miel y Almendras", de="Hähnchen-Tajine mit Honig und Mandeln", d=(4, 3, 3, 0.5, 8, 0), sweet=True),
    dict(base="طاجين دجاج", ar="طاجين دجاج بالزبيب", en="Chicken Tajine with Raisins", fr="Tajine de Poulet aux Raisins", es="Tajine de Pollo con Pasas", de="Hähnchen-Tajine mit Rosinen", d=(2, 3, 0, 0.5, 6, 0)),
    dict(base="طاجين كفتة", ar="طاجين كفتة بالخضروات", en="Kefta Tajine with Vegetables", fr="Tajine de Kefta aux Légumes", es="Tajine de Kofta con Verduras", de="Kefta-Tajine mit Gemüse", d=(1, 5, 0, 2, 0, 0)),
    dict(base="طاجين كفتة", ar="طاجين كفتة بالجبن", en="Kefta Tajine with Cheese", fr="Tajine de Kefta au Fromage", es="Tajine de Kofta con Queso", de="Kefta-Tajine mit Käse", d=(4, 1, 3, 0, 0, 80), sat=0.55),
    dict(base="طاجين كفتة", ar="طاجين كفتة بالبطاطس", en="Kefta Tajine with Potatoes", fr="Tajine de Kefta aux Pommes de Terre", es="Tajine de Kofta con Patatas", de="Kefta-Tajine mit Kartoffeln", d=(2, 7, 1, 1, 0, 0)),
    dict(base="طاجين سمك", ar="طاجين سمك بالشرمولة", en="Fish Tajine with Chermoula", fr="Tajine de Poisson à la Chermoula", es="Tajine de Pescado con Chermoula", de="Fisch-Tajine mit Chermoula", d=(2, 2, 1, 0, 0, 60)),
    dict(base="طاجين سمك", ar="طاجين سمك بالزيتون والطماطم", en="Fish Tajine with Olives and Tomato", fr="Tajine de Poisson aux Olives et Tomates", es="Tajine de Pescado con Aceitunas y Tomate", de="Fisch-Tajine mit Oliven und Tomaten", d=(2, 4, 1, 0, 0, 90)),
    dict(base="طاجين سمك", ar="طاجين سمك بالبطاطس", en="Fish Tajine with Potatoes", fr="Tajine de Poisson aux Pommes de Terre", es="Tajine de Pescado con Patatas", de="Fisch-Tajine mit Kartoffeln", d=(2, 7, 0.5, 1, 0, 0)),
    dict(base="طاجين خضروات", ar="طاجين خضروات بالحمص", en="Vegetable Tajine with Chickpeas", fr="Tajine de Légumes aux Pois Chiches", es="Tajine de Verduras con Garbanzos", de="Gemüse-Tajine mit Kichererbsen", d=(3, 5, 0.5, 2, 0, 0)),
    dict(base="طاجين خضروات", ar="طاجين خضروات بالخرشوف", en="Vegetable Tajine with Artichokes", fr="Tajine de Légumes aux Artichauts", es="Tajine de Verduras con Alcachofas", de="Gemüse-Tajine mit Artischocken", d=(1, 3, 0, 2, 0, 0)),
    dict(base="طاجين خضروات", ar="طاجين خضروات بالكوسة والجزر", en="Vegetable Tajine with Zucchini and Carrots", fr="Tajine de Légumes aux Courgettes et Carottes", es="Tajine de Verduras con Calabacín y Zanahorias", de="Gemüse-Tajine mit Zucchini und Karotten", d=(0, 4, 0, 1.5, 0, 0)),
    dict(base="طاجين بالبرقوق (خفيف)", ar="طاجين برقوق باللوز", en="Tajine with Prunes and Almonds", fr="Tajine aux Pruneaux et Amandes", es="Tajine de Ciruelas Pasas con Almendras", de="Pflaumen-Tajine mit Mandeln", d=(3, 2, 2, 0.5, 4, 0)),
    dict(base="طاجين خليع (خفيف)", ar="طاجين خليع بالبيض", en="Khlii Tajine with Eggs", fr="Tajine de Khlii aux Œufs", es="Tajine de Khlii con Huevos", de="Khlii-Tajine mit Eiern", d=(6, 1, 3, 0, 0, 40)),
    # ---------------- SOUPS ----------------
    dict(base="حريرة", ar="حريرة بلحم البقر", en="Harira with Beef", fr="Harira au Bœuf", es="Harira con Ternera", de="Harira mit Rindfleisch", d=(6, 2, 2, 0.5, 0, 0)),
    dict(base="حريرة", ar="حريرة بالحمص", en="Harira with Chickpeas", fr="Harira aux Pois Chiches", es="Harira con Garbanzos", de="Harira mit Kichererbsen", d=(2, 5, 0.5, 2, 0, 0)),
    dict(base="حريرة", ar="حريرة بالخضروات", en="Harira with Vegetables", fr="Harira aux Légumes", es="Harira con Verduras", de="Harira mit Gemüse", d=(1, 3, 0, 1.5, 0, 0)),
    dict(base="حريرة", ar="حريرة بالعدس", en="Harira with Lentils", fr="Harira aux Lentilles", es="Harira con Lentejas", de="Harira mit Linsen", d=(2, 5, 0, 2, 0, 0)),
    dict(base="حريرة", ar="حريرة بالكزبرة والبقدونس", en="Harira with Coriander and Parsley", fr="Harira à la Coriandre et au Persil", es="Harira con Cilantro y Perejil", de="Harira mit Koriander und Petersilie", d=(1, 1, 0, 0.5, 0, 0)),
    dict(base="شوربة عدس", ar="شوربة عدس بالجزر", en="Lentil Soup with Carrots", fr="Soupe de Lentilles aux Carottes", es="Sopa de Lentejas con Zanahorias", de="Linsensuppe mit Karotten", d=(1, 4, 0, 1.5, 0, 0)),
    dict(base="شوربة عدس", ar="شوربة عدس بالكمون", en="Lentil Soup with Cumin", fr="Soupe de Lentilles au Cumin", es="Sopa de Lentejas con Comino", de="Linsensuppe mit Kreuzkümmel", d=(0, 1, 0, 0, 0, 20)),
    dict(base="شوربة دجاج", ar="شوربة دجاج بالشعيرية", en="Chicken Noodle Soup", fr="Soupe de Poulet aux Vermicelles", es="Sopa de Pollo con Fideos", de="Hühnersuppe mit Nudeln", d=(2, 8, 0.5, 0.5, 0, 0)),
    dict(base="شوربة دجاج", ar="شوربة دجاج بالخضروات", en="Chicken Soup with Vegetables", fr="Soupe de Poulet aux Légumes", es="Sopa de Pollo con Verduras", de="Hühnersuppe mit Gemüse", d=(1, 4, 0, 1.5, 0, 0)),
    dict(base="شوربة فاسية", ar="شوربة فاسية بالتوابل", en="Fassi Soup with Spices", fr="Soupe Fassie aux Épices", es="Sopa Fassi con Especias", de="Fassi-Suppe mit Gewürzen", d=(1, 1, 0, 0, 0, 20)),
    # ---------------- SALADS ----------------
    dict(base="سلطة", ar="سلطة الطماطم والبصل", en="Tomato and Onion Salad", fr="Salade de Tomates et Oignons", es="Ensalada de Tomate y Cebolla", de="Tomaten-Zwiebel-Salat", d=(1, 4, 0, 1, 0, 10)),
    dict(base="سلطة", ar="سلطة الجزر المغربية", en="Moroccan Carrot Salad", fr="Salade de Carottes Marocaine", es="Ensalada Marroquí de Zanahoria", de="Marokkanischer Karottensalat", d=(1, 5, 0, 1.5, 2, 10)),
    dict(base="سلطة", ar="سلطة الخضروات المغربية", en="Moroccan Vegetable Salad", fr="Salade de Légumes Marocaine", es="Ensalada Marroquí de Verduras", de="Marokkanischer Gemüsesalat", d=(1, 4, 0, 1.5, 0, 10)),
    dict(base="سلطة", ar="سلطة الحمص المغربية", en="Moroccan Chickpea Salad", fr="Salade de Pois Chiches Marocaine", es="Ensalada Marroquí de Garbanzos", de="Marokkanischer Kichererbsensalat", d=(3, 6, 0.5, 2, 0, 20)),
    dict(base="زعلوك", ar="زعلوك بالباذنجان والفلفل", en="Zaalouk with Eggplant and Pepper", fr="Zaalouk à l'Aubergine et Poivron", es="Zaalouk con Berenjena y Pimiento", de="Zaalouk mit Aubergine und Paprika", d=(1, 4, 1, 1.5, 0, 15)),
    dict(base="زعلوك", ar="زعلوك بالكوسة", en="Zaalouk with Zucchini", fr="Zaalouk à la Courgette", es="Zaalouk con Calabacín", de="Zaalouk mit Zucchini", d=(1, 4, 1, 1, 0, 10)),
    dict(base="تكتوكة", ar="تكتوكة بالبيض", en="Taktouka with Eggs", fr="Taktouka aux Œufs", es="Taktouka con Huevos", de="Taktouka mit Eiern", d=(4, 2, 2, 0.5, 0, 40)),
    # ---------------- GRILLED MEATS ----------------
    dict(base="لحم خروف مشوي", ar="لحم غنم مشوي بالشرمولة", en="Grilled Lamb with Chermoula", fr="Agneau Grillé à la Chermoula", es="Cordero a la Parrilla con Chermoula", de="Gegrilltes Lamm mit Chermoula", d=(1, 1, 1, 0, 0, 30)),
    dict(base="لحم خروف مشوي", ar="لحم غنم مشوي بالكمون والبهارات", en="Grilled Lamb with Cumin and Spices", fr="Agneau Grillé au Cumin et aux Épices", es="Cordero a la Parrilla con Comino y Especias", de="Gegrilltes Lamm mit Kreuzkümmel und Gewürzen", d=(1, 1, 1, 0, 0, 20)),
    dict(base="لحم بقري مشوي", ar="لحم بقري مشوي بالزعتر والليمون", en="Grilled Beef with Thyme and Lemon", fr="Bœuf Grillé au Thym et Citron", es="Ternera a la Parrilla con Tomillo y Limón", de="Gegrilltes Rindfleisch mit Thymian und Zitrone", d=(1, 1, 1, 0, 0, 20)),
    dict(base="صدر دجاج مشوي", ar="صدر دجاج مشوي بالشرمولة", en="Grilled Chicken Breast with Chermoula", fr="Poitrine de Poulet Grillé à la Chermoula", es="Pechuga de Pollo a la Parrilla con Chermoula", de="Gegrillte Hähnchenbrust mit Chermoula", d=(2, 1, 0.5, 0, 0, 30)),
    dict(base="صدر دجاج مشوي", ar="صدر دجاج مشوي بالليمون والزعتر", en="Grilled Chicken Breast with Lemon and Thyme", fr="Poitrine de Poulet Grillé au Citron et Thym", es="Pechuga de Pollo a la Parrilla con Limón y Tomillo", de="Gegrillte Hähnchenbrust mit Zitrone und Thymian", d=(2, 1, 0.5, 0, 0, 20)),
    dict(base="صدر رومي مشوي", ar="صدر رومي مشوي بالشرمولة", en="Grilled Turkey Breast with Chermoula", fr="Poitrine de Dinde Grillé à la Chermoula", es="Pechuga de Pavo a la Parrilla con Chermoula", de="Gegrillte Putenbrust mit Chermoula", d=(1, 1, 0.5, 0, 0, 30)),
    dict(base="كفتة بروشيت مشوية", ar="كفتة بروشيت بالبقدونس والكمون", en="Kefta Brochettes with Parsley and Cumin", fr="Brochettes de Kefta au Persil et Cumin", es="Brochetas de Kofta con Perejil y Comino", de="Kefta-Spieße mit Petersilie und Kreuzkümmel", d=(2, 1, 1, 0, 0, 20)),
    dict(base="مرقاز مشوي", ar="مرقاز بالشرمولة", en="Merguez with Chermoula", fr="Merguez à la Chermoula", es="Merguez con Chermoula", de="Merguez mit Chermoula", d=(1, 0, 0.5, 0, 0, 30)),
    # ---------------- PASTRIES & BREADS ----------------
    dict(base="بريوات باللوز (خفيفة)", ar="بريوات باللوز والعسل", en="Almond Briouat with Honey", fr="Briouat aux Amandes et Miel", es="Briouat de Almendras con Miel", de="Mandel-Briouat mit Honig", d=(2, 3, 2, 0.5, 6, 0), sweet=True),
    dict(base="بريوات (فرن، خفيفة)", ar="بريوات بالدجاج", en="Chicken Briouat", fr="Briouat au Poulet", es="Briouat de Pollo", de="Hähnchen-Briouat", d=(6, 2, 2, 0.5, 0, 40)),
    dict(base="بريوات (فرن، خفيفة)", ar="بريوات بالجبن", en="Cheese Briouat", fr="Briouat au Fromage", es="Briouat de Queso", de="Käse-Briouat", d=(4, 2, 3, 0, 0, 80), sat=0.55),
    dict(base="بريوات (فرن، خفيفة)", ar="بريوات بالخضروات", en="Vegetable Briouat", fr="Briouat aux Légumes", es="Briouat de Verduras", de="Gemüse-Briouat", d=(1, 4, 1, 1, 0, 20)),
    dict(base="بسطيلة بالدجاج", ar="بسطيلة بالحمام", en="Pigeon Pastilla", fr="Pastilla au Pigeon", es="Pastela de Pichón", de="Tauben-Pastilla", d=(2, 0, 1, 0, 0, 20)),
    dict(base="بسطيلة بالدجاج", ar="بسطيلة باللوز والعسل", en="Pastilla with Almonds and Honey", fr="Pastilla aux Amandes et Miel", es="Pastela con Almendras y Miel", de="Pastilla mit Mandeln und Honig", d=(2, 4, 3, 1, 8, 0), sweet=True),
    dict(base="خبز", ar="خبز بالسمسم", en="Sesame Bread", fr="Pain au Sésame", es="Pan de Sésamo", de="Sesambrot", d=(2, 2, 1, 0.5, 0, 10)),
    dict(base="خبز", ar="خبز الشعير", en="Barley Bread", fr="Pain d'Orge", es="Pan de Cebada", de="Gerstenbrot", d=(1, 3, -0.5, 1, 0, 0)),
    dict(base="خبز", ar="خبز بالتمر", en="Date Bread", fr="Pain aux Dattes", es="Pan de Dátiles", de="Dattelbrot", d=(1, 4, 0, 0.5, 4, 0)),
    dict(base="خبز بالزيتون", ar="خبز بالزيتون والزعتر", en="Olive and Thyme Bread", fr="Pain aux Olives et Thym", es="Pan de Aceitunas y Tomillo", de="Oliven- und Thymianbrot", d=(1, 2, 0.5, 0.5, 0, 30)),
    dict(base="مسمن", ar="مسمن بالعسل", en="Msemen with Honey", fr="Msemen au Miel", es="Msemen con Miel", de="Msemen mit Honig", d=(0, 2, 0, 0, 8, 0), sweet=True),
    dict(base="مسمن", ar="مسمن بالسكر والقرفة", en="Msemen with Sugar and Cinnamon", fr="Msemen au Sucre et Cannelle", es="Msemen con Azúcar y Canela", de="Msemen mit Zucker und Zimt", d=(0, 2, 0, 0, 8, 0), sweet=True),
    dict(base="بغرير", ar="بغرير بالزبدة والعسل", en="Baghrir with Butter and Honey", fr="Baghrir au Beurre et Miel", es="Baghrir con Mantequilla y Miel", de="Baghrir mit Butter und Honig", d=(0, 3, 1.5, 0, 8, 0), sweet=True),
    dict(base="حرشة", ar="حرشة بالزيتون", en="Harcha with Olives", fr="Harcha aux Olives", es="Harcha con Aceitunas", de="Harcha mit Oliven", d=(1, 2, 1, 0.5, 0, 80)),
    dict(base="حرشة", ar="حرشة بالعسل", en="Harcha with Honey", fr="Harcha au Miel", es="Harcha con Miel", de="Harcha mit Honig", d=(1, 2, 1, 0, 8, 0), sweet=True),
    # ---------------- SWEETS ----------------
    dict(base="غريبة (خفيفة)", ar="غريبة باللوز", en="Almond Ghrayba", fr="Ghriba aux Amandes", es="Ghraiba con Almendras", de="Mandel-Ghriba", d=(2, 2, 3, 0.5, 1, 0)),
    dict(base="غريبة (خفيفة)", ar="غريبة بالعسل", en="Honey Ghrayba", fr="Ghriba au Miel", es="Ghraiba con Miel", de="Honig-Ghriba", d=(0, 2, 1, 0, 6, 0)),
    dict(base="غريبة (خفيفة)", ar="غريبة بالسمسم", en="Sesame Ghrayba", fr="Ghriba au Sésame", es="Ghraiba con Sésamo", de="Sesam-Ghriba", d=(2, 2, 2, 0.5, 0, 0)),
    dict(base="فكاس", ar="فكاس باللوز", en="Almond Fekkas", fr="Fekkas aux Amandes", es="Fekkas con Almendras", de="Mandel-Fekkas", d=(2, 3, 2, 0.5, 1, 0)),
    dict(base="فكاس", ar="فكاس بالسمسم", en="Sesame Fekkas", fr="Fekkas au Sésame", es="Fekkas con Sésamo", de="Sesam-Fekkas", d=(2, 3, 2, 0.5, 0, 0)),
    dict(base="شباكية (خفيفة)", ar="شباكية باللوز", en="Almond Chebbakia", fr="Chebakia aux Amandes", es="Chebakia con Almendras", de="Mandel-Chebakia", d=(2, 2, 3, 0.5, 2, 0)),
    dict(base="سلو", ar="سلو باللوز", en="Almond Sellou", fr="Sellou aux Amandes", es="Sellou con Almendras", de="Mandel-Sellou", d=(2, 3, 2, 0.5, 1, 0)),
    dict(base="سلو", ar="سلو بالسمسم", en="Sesame Sellou", fr="Sellou au Sésame", es="Sellou con Sésamo", de="Sesam-Sellou", d=(2, 2, 2, 0.5, 0, 0)),
    # ---------------- BREAKFAST & OTHER BASES ----------------
    dict(base="بيصارة", ar="بيصارة بالكمون", en="Bissara with Cumin", fr="Bissara au Cumin", es="Bissara con Comino", de="Bissara mit Kreuzkümmel", d=(1, 1, 0, 0.5, 0, 20)),
    dict(base="بيصارة", ar="بيصارة بزيت الزيتون", en="Bissara with Olive Oil", fr="Bissara à l'Huile d'Olive", es="Bissara con Aceite de Oliva", de="Bissara mit Olivenöl", d=(1, 1, 1, 0, 0, 10)),
    dict(base="زبادي", ar="زبادي بالعسل", en="Yogurt with Honey", fr="Yaourt au Miel", es="Yogur con Miel", de="Joghurt mit Honig", d=(1, 3, 0, 0, 8, 0), sweet=True),
    dict(base="زبادي", ar="زبادي باللوز", en="Yogurt with Almonds", fr="Yaourt aux Amandes", es="Yogur con Almendras", de="Joghurt mit Mandeln", d=(1, 1, 2, 0.5, 0, 10)),
    dict(base="بيض مسلوق", ar="بيض مسلوق بالزعتر", en="Boiled Eggs with Thyme", fr="Œufs Durs au Thym", es="Huevos Hervidos con Tomillo", de="Gekochte Eier mit Thymian", d=(1, 0, 0.5, 0, 0, 20)),
    dict(base="تونة بالماء", ar="تونة بزيت الزيتون", en="Tuna in Olive Oil", fr="Thon à l'Huile d'Olive", es="Atún en Aceite de Oliva", de="Thunfisch in Olivenöl", d=(2, 0, 4, 0, 0, -10)),
    dict(base="أملو", ar="أملو باللوز والعسل", en="Amlou with Almonds and Honey", fr="Amlou aux Amandes et Miel", es="Amlou con Almendras y Miel", de="Amlou mit Mandeln und Honig", d=(1, 1, 1, 0.5, 4, 0), sweet=True),
    dict(base="فول عشا", ar="فول بالكمون", en="Foul Medames with Cumin", fr="Fèves au Cumin", es="Habas con Comino", de="Foul mit Kreuzkümmel", d=(1, 1, 0, 0.5, 0, 20)),
    dict(base="فول عشا", ar="فول بالطماطم", en="Foul Medames with Tomato", fr="Fèves à la Tomate", es="Habas con Tomate", de="Foul mit Tomaten", d=(1, 3, 0, 1, 0, 20)),
    dict(base="جبن", ar="جبن بالعسل", en="Jben with Honey", fr="Jben au Miel", es="Jben con Miel", de="Jben mit Honig", d=(1, 2, 0, 0, 8, 0), sweet=True),
    dict(base="رفيسة بالدجاج", ar="رفيسة بالدجاج والعدس", en="Chicken Rfissa with Lentils", fr="Rfissa au Poulet et Lentilles", es="Rfissa de Pollo con Lentejas", de="Hähnchen-Rfissa mit Linsen", d=(2, 3, 0.5, 1.5, 0, 20)),
    dict(base="بركوكس", ar="بركوكس باللحم والحمص", en="Berkoukes with Meat and Chickpeas", fr="Berkoukes à la Viande et Pois Chiches", es="Berkoukes con Carne y Garbanzos", de="Berkoukes mit Fleisch und Kichererbsen", d=(3, 5, 1, 2, 0, 20)),
    dict(base="سفة", ar="سفة بالزبيب واللوز", en="Seffa with Raisins and Almonds", fr="Seffa aux Raisins et Amandes", es="Seffa con Pasas y Almendras", de="Seffa mit Rosinen und Mandeln", d=(2, 4, 2, 0.5, 5, 0), sweet=True),
    dict(base="مروزية (خفيفة)", ar="مروزية باللوز", en="Mrouzia with Almonds", fr="Mrouzia aux Amandes", es="Mrouzia con Almendras", de="Mrouzia mit Mandeln", d=(2, 1, 2, 0.5, 0, 0)),
    dict(base="طنجية مراكشية", ar="طنجية مراكشية بالزيتون", en="Tanjia with Olives", fr="Tanjia aux Olives", es="Tanjia con Aceitunas", de="Tanjia mit Oliven", d=(1, 1, 1, 0, 0, 80)),
    dict(base="لوبيا", ar="لوبيا بالخضروات", en="Loubia with Vegetables", fr="Loubia aux Légumes", es="Loubia con Verduras", de="Loubia mit Gemüse", d=(1, 4, 0, 1.5, 0, 10)),
    dict(base="عدس", ar="عدس بالجزر", en="Lentils with Carrots", fr="Lentilles aux Carottes", es="Lentejas con Zanahorias", de="Linsen mit Karotten", d=(1, 4, 0, 1.5, 0, 10)),
    dict(base="بابوش", ar="بابوش بالشرمولة", en="Babouch with Chermoula", fr="Babouch à la Chermoula", es="Babouch con Chermoula", de="Babouch mit Chermoula", d=(1, 1, 0, 0, 0, 30)),
    dict(base="بطاطا بالفرن", ar="بطاطا بالفرن بالزعتر والليمون", en="Oven-Baked Potatoes with Thyme and Lemon", fr="Pommes de Terre au Four, Thym et Citron", es="Patatas al Horno con Tomillo y Limón", de="Ofenkartoffeln mit Thymian und Zitrone", d=(1, 3, 0.5, 0.5, 0, 20)),
    dict(base="طحينة", ar="طحينة بالليمون", en="Tahini with Lemon", fr="Tahini au Citron", es="Tahini con Limón", de="Tahini mit Zitrone", d=(0, 1, 0, 0, 0, 10)),
    dict(base="شكشوكة", ar="شكشوكة بالبطاطس", en="Shakshouka with Potatoes", fr="Chakchouka aux Pommes de Terre", es="Shakshuka con Patatas", de="Schakschuka mit Kartoffeln", d=(2, 5, 1, 1, 0, 30)),
    dict(base="بسيسة", ar="بسيسة بالعسل", en="Bsissa with Honey", fr="Bsissa au Miel", es="Bsissa con Miel", de="Bsissa mit Honig", d=(1, 3, 1, 0, 6, 0), sweet=True),
    dict(base="زميتة", ar="زميتة باللوز", en="Zemita with Almonds", fr="Zemita aux Amandes", es="Zemita con Almendras", de="Zemita mit Mandeln", d=(2, 3, 2, 0.5, 1, 0)),
    dict(base="حمام مشوي", ar="حمام مشوي بالزعفران", en="Grilled Pigeon with Saffron", fr="Pigeon Grillé au Safran", es="Pichón a la Parrilla con Azafrán", de="Gegrillte Taube mit Safran", d=(1, 0, 0.5, 0, 0, 10)),
    dict(base="أرنب مشوي", ar="أرنب مشوي بالشرمولة", en="Grilled Rabbit with Chermoula", fr="Lapin Grillé à la Chermoula", es="Conejo a la Parrilla con Chermoula", de="Gegrilltes Kaninchen mit Chermoula", d=(1, 0, 0.5, 0, 0, 30)),
    dict(base="سردين مشوي", ar="سردين محشي بالشرمولة", en="Stuffed Sardines with Chermoula", fr="Sardines Farcies à la Chermoula", es="Sardinas Rellenas con Chermoula", de="Gefüllte Sardinen mit Chermoula", d=(3, 2, 1, 0, 0, 40)),
    dict(base="جمبري مشوي", ar="جمبري مشوي بالشرمولة", en="Grilled Shrimp with Chermoula", fr="Crevettes Grillées à la Chermoula", es="Gambas a la Parrilla con Chermoula", de="Gegrillte Garnelen mit Chermoula", d=(2, 1, 0.5, 0, 0, 40)),
    dict(base="حوت قواري", ar="حوت قواري بالزيتون", en="Hout Quari with Olives", fr="Hout Quari aux Olives", es="Hout Quari con Aceitunas", de="Hout Quari mit Oliven", d=(1, 1, 1, 0, 0, 80)),
    dict(base="سمك مشوي", ar="سمك مشوي بالليمون", en="Grilled Fish with Lemon", fr="Poisson Grillé au Citron", es="Pescado a la Parrilla con Limón", de="Gegrillter Fisch mit Zitrone", d=(2, 1, 0.5, 0, 0, 20)),
    dict(base="سمك مشوي", ar="سمك بالفرن بالخضروات", en="Oven-Baked Fish with Vegetables", fr="Poisson au Four aux Légumes", es="Pescado al Horno con Verduras", de="Ofenfisch mit Gemüse", d=(2, 3, 0.5, 1, 0, 20)),
    dict(base="طاجين سمك", ar="طاجين حوت بالبطاطس", en="Fish Tajine with Potatoes", fr="Tajine de Poisson aux Pommes de Terre", es="Tajine de Pescado con Patatas", de="Fisch-Tajine mit Kartoffeln", d=(2, 6, 0.5, 1, 0, 20)),
]

# default sat factor by category
SAT_CAT = {
    "couscous_tagines": 0.30, "main_dishes": 0.32, "grilled_meats": 0.35,
    "fish_seafood": 0.10, "soups": 0.30, "salads_sides": 0.20,
    "sweets_desserts": 0.35, "breakfast": 0.32, "breads_pastries": 0.30,
    "dairy_eggs_fruits": 0.55,
}


def r1(x):
    return round(x * 10) / 10


def main():
    with open(JSON, "r", encoding="utf-8") as fh:
        data = json.load(fh)

    by_cat = {c["id"]: c for c in data["categories"]}
    base_index = {}
    for c in data["categories"]:
        for d in c["dishes"]:
            base_index[d["name"]] = d

    missing_bases = sorted({v["base"] for v in V if v["base"] not in base_index})
    if missing_bases:
        print("MISSING BASE DISHES:", missing_bases)
        sys.exit(1)

    dup_names = set()
    seen = set(base_index.keys())
    added = 0
    for v in V:
        base = base_index[v["base"]]
        cat = next(c["id"] for c in data["categories"] if c["id"] == base.get("cat") or any(x["name"] == base["name"] for x in c["dishes"]))
        # find category via scan
        for c in data["categories"]:
            if any(x["name"] == base["name"] for x in c["dishes"]):
                cat = c["id"]
                break

        dp, dc, df, dfib, dsug, dsod = v["d"]
        serv = base["serv_g"]
        scale = serv / 100.0
        p = r1(base["p"] + dp * scale)
        c = r1(base["c"] + dc * scale)
        f = r1(base["f"] + df * scale)
        cal_100 = r1(base["cal_100"] + 4 * dp + 4 * dc + 9 * df)
        cal_serv = int(round(cal_100 * serv / 100.0))

        fiber = r1((base.get("fiber_g") or 0) + dfib)
        sugar = r1((base.get("sugar_g") or 0) + dsug)
        sodium = r1((base.get("sodium_mg") or 0) + dsod)
        sat_factor = v.get("sat") or SAT_CAT.get(cat, 0.30)
        sat_fat = r1((base.get("sat_fat_g") or 0) + sat_factor * df)

        meals = v.get("meals") or base["mealTypes"]
        is_fried = False
        is_sweet = bool(v.get("sweet")) or v.get("is_sweet") or any(w in v["ar"] for w in ["عسل", "حلو", "سكر"])
        is_sweet = is_sweet or any(w in v["en"].lower() for w in ["sweet", "honey", "sugar"])
        healthy = not (is_fried or is_sweet or cal_100 > 400 or sat_fat > 8 or sodium > 600)

        if v["ar"] in seen:
            dup_names.add(v["ar"])
        seen.add(v["ar"])

        dish = {
            "name": v["ar"],
            "name_en": v["en"],
            "name_fr": v["fr"],
            "name_es": v["es"],
            "name_de": v["de"],
            "cal_100": cal_100,
            "p": p,
            "c": c,
            "f": f,
            "fiber_g": fiber,
            "sugar_g": sugar,
            "sodium_mg": sodium,
            "sat_fat_g": sat_fat,
            "serv_g": serv,
            "cal_serv": cal_serv,
            "healthy": healthy,
            "is_fried": is_fried,
            "is_sweet": is_sweet,
            "mealType": meals[0],
            "mealTypes": meals,
            "source": "Moroccan Kitchen - Extended Variants",
            "notes": f"Variant of {base['name_en']}",
            "confidence": 65,
            "confidence_label": "65% - تقديري (variant)",
            "confidence_color": "orange",
        }
        by_cat[cat]["dishes"].append(dish)
        by_cat[cat]["count"] += 1
        added += 1

    data["total_dishes"] = len(seen)

    # validation
    errors = []
    all_names = []
    for c in data["categories"]:
        for d in c["dishes"]:
            for k in ("name", "name_en", "name_fr", "name_es", "name_de"):
                if not str(d.get(k, "")).strip():
                    errors.append(f"{d['name']}: empty '{k}'")
            if not (20 <= d["cal_100"] <= 900):
                errors.append(f"{d['name']}: cal_100 {d['cal_100']} out of [20,900]")
            all_names.append(d["name"])

    if dup_names:
        errors.append("Duplicate Arabic names (new): " + ", ".join(sorted(dup_names)))

    if errors:
        print("VALIDATION ERRORS:")
        for e in errors:
            print("  -", e)
        sys.exit(2)

    with open(JSON, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)
        fh.write("\n")

    print(f"WROTE {JSON}")
    print(f"ADDED: {added}  TOTAL: {data['total_dishes']}")
    print("CATEGORY COUNTS:")
    for c in data["categories"]:
        print(f"  {c['id']:18s} {c['count']:3d}  {c['name_ar']}")


if __name__ == "__main__":
    main()