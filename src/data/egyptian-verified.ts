// FINAL source of truth for Egyptian cuisine — generated verbatim from Egyptian-Verified-82.json
export interface EgyptianVerifiedDish {
  id: string;
  nameAr: string;
  nameEn: string;
  mealType: string;
  mealTypeAr: string;
  grams: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  source: string;
  ingredients: string;
  notes: string;
}

export const EGYPTIAN_VERIFIED: EgyptianVerifiedDish[] = [
  { id: "eg_1", nameAr: "فول مدمس بلدي", nameEn: "فول مدمس بلدي", mealType: "breakfast", mealTypeAr: "فطار", grams: 150, kcal: 165, protein: 11.4, carbs: 29.4, fat: 0.6, source: "أبلة نظيرة ص45", ingredients: "فول مدمس مسلوق 150جم", notes: "مطبوخ بدون اضافات" },
  { id: "eg_2", nameAr: "فول بزيت زيتون", nameEn: "فول بزيت زيتون", mealType: "breakfast", mealTypeAr: "فطار", grams: 165, kcal: 215, protein: 11.6, carbs: 30.5, fat: 5.8, source: "أبلة نظيرة ص45", ingredients: "فول 150جم + زيت 5مل", notes: "زيت زيتون بكر" },
  { id: "eg_3", nameAr: "فول اسكندراني", nameEn: "فول اسكندراني", mealType: "breakfast", mealTypeAr: "فطار", grams: 180, kcal: 235, protein: 12.1, carbs: 28.2, fat: 8.4, source: "سكندري ص22", ingredients: "فول 120جم + طماطم 30جم + طحينة 10جم", notes: "طماطم وفلفل" },
  { id: "eg_4", nameAr: "طعمية مصرية 4قرص", nameEn: "طعمية مصرية 4قرص", mealType: "breakfast", mealTypeAr: "فطار", grams: 105, kcal: 210, protein: 11.2, carbs: 26.7, fat: 14.9, source: "أبلة نظيرة ص48", ingredients: "فول مدشوش 60جم + زيت قلي 15جم + خضرة", notes: "مقلية" },
  { id: "eg_5", nameAr: "شكشوكة مصرية", nameEn: "شكشوكة مصرية", mealType: "breakfast", mealTypeAr: "فطار", grams: 205, kcal: 195, protein: 13.8, carbs: 5.2, fat: 12.1, source: "أبلة نظيرة ص52", ingredients: "بيض 100جم + طماطم 80جم + بصل 20جم + زيت 5جم", notes: "بيض بالطماطم" },
  { id: "eg_6", nameAr: "بيض بالبسطرمة", nameEn: "بيض بالبسطرمة", mealType: "breakfast", mealTypeAr: "فطار", grams: 120, kcal: 285, protein: 18.2, carbs: 1.2, fat: 22.1, source: "مصري شعبي", ingredients: "بيض 80جم + بسطرمة 40جم", notes: "بسطرمة بلدي" },
  { id: "eg_7", nameAr: "جبنة قريش بالطماطم", nameEn: "جبنة قريش بالطماطم", mealType: "breakfast", mealTypeAr: "فطار", grams: 150, kcal: 145, protein: 14.5, carbs: 4.2, fat: 8.1, source: "فلاحي", ingredients: "جبنة قريش 100جم + طماطم 50جم", notes: "قريش فلاحي" },
  { id: "eg_8", nameAr: "عجة بيض", nameEn: "عجة بيض", mealType: "breakfast", mealTypeAr: "فطار", grams: 140, kcal: 225, protein: 12.1, carbs: 8.4, fat: 15.2, source: "أبلة نظيرة ص55", ingredients: "بيض 80جم + بقدونس 20جم + دقيق 10جم + زيت 5جم", notes: "عجة فرن" },
  { id: "eg_9", nameAr: "بصارة", nameEn: "بصارة", mealType: "breakfast", mealTypeAr: "فطار", grams: 95, kcal: 185, protein: 10.2, carbs: 22.4, fat: 5.1, source: "أبلة نظيرة ص58", ingredients: "فول مدشوش 80جم + ملوخية ناشفة 5جم + بصل 10جم", notes: "صيامي" },
  { id: "eg_10", nameAr: "عدس أصفر", nameEn: "عدس أصفر", mealType: "breakfast", mealTypeAr: "فطار شتوي", grams: 145, kcal: 245, protein: 13.8, carbs: 32.1, fat: 6.2, source: "أبلة نظيرة ص78", ingredients: "عدس 60جم + جزر 30جم + بصل 20جم + زيت 5جم", notes: "شوربة عدس" },
  { id: "eg_11", nameAr: "فطير مشلتت", nameEn: "فطير مشلتت", mealType: "breakfast", mealTypeAr: "فطار", grams: 130, kcal: 485, protein: 8.5, carbs: 56.2, fat: 25.3, source: "فلاحي ص12", ingredients: "دقيق 80جم + زبدة 30جم + لبن 20مل", notes: "مورق" },
  { id: "eg_12", nameAr: "فول وطعمية كومبو", nameEn: "فول وطعمية كومبو", mealType: "breakfast", mealTypeAr: "فطار", grams: 190, kcal: 285, protein: 14.2, carbs: 32.1, fat: 10.2, source: "شعبي", ingredients: "فول 100جم + طعمية 50جم + عيش 40جم", notes: "كومبو شعبي" },
  { id: "eg_13", nameAr: "كشري مصري", nameEn: "كشري مصري", mealType: "lunch", mealTypeAr: "غدا", grams: 235, kcal: 354, protein: 13.1, carbs: 62.8, fat: 5.4, source: "أبلة نظيرة ص112", ingredients: "رز 50جم + عدس 50جم + مكرونة 50جم + حمص 30جم + بصل 15جم + صلصة 40جم", notes: "الطبق القومي" },
  { id: "eg_14", nameAr: "ملوخية بالأرانب", nameEn: "ملوخية بالأرانب", mealType: "lunch", mealTypeAr: "غدا", grams: 285, kcal: 202, protein: 32.5, carbs: 9.2, fat: 4.5, source: "أبلة نظيرة ص98", ingredients: "ملوخية 100جم + أرنب 80جم + شوربة 100مل", notes: "ملوخية خضرا" },
  { id: "eg_15", nameAr: "ملوخية بالفراخ", nameEn: "ملوخية بالفراخ", mealType: "lunch", mealTypeAr: "غدا", grams: 300, kcal: 285, protein: 35.2, carbs: 9.2, fat: 7.1, source: "أبلة نظيرة ص99", ingredients: "ملوخية 100جم + فراخ 100جم", notes: "بالفراخ" },
  { id: "eg_16", nameAr: "محشي كرنب", nameEn: "محشي كرنب", mealType: "lunch", mealTypeAr: "غدا", grams: 250, kcal: 310, protein: 7.6, carbs: 48.2, fat: 9.8, source: "أبلة نظيرة ص85", ingredients: "رز 40جم + كرنب 100جم + طماطم 50جم + زيت 8جم", notes: "محشي مصري" },
  { id: "eg_17", nameAr: "محشي ورق عنب", nameEn: "محشي ورق عنب", mealType: "lunch", mealTypeAr: "غدا", grams: 218, kcal: 295, protein: 7.6, carbs: 46.9, fat: 9.8, source: "أبلة نظيرة ص86", ingredients: "رز 40جم + ورق عنب 60جم + كوسة 60جم + طماطم 50جم", notes: "ورق عنب" },
  { id: "eg_18", nameAr: "مسقعة لحمة", nameEn: "مسقعة لحمة", mealType: "lunch", mealTypeAr: "غدا", grams: 270, kcal: 285, protein: 12.4, carbs: 18.5, fat: 19.2, source: "أبلة نظيرة ص92", ingredients: "باذنجان 120جم + لحم مفروم 60جم + طماطم 60جم + زيت 10جم", notes: "مسقعة" },
  { id: "eg_19", nameAr: "حواوشي بلدي", nameEn: "حواوشي بلدي", mealType: "lunch", mealTypeAr: "غدا", grams: 230, kcal: 466, protein: 27.7, carbs: 42.1, fat: 19.5, source: "سياحة ص72", ingredients: "لحم مفروم 100جم + عيش 80جم + بصل 30جم", notes: "حواوشي" },
  { id: "eg_20", nameAr: "كفتة رز", nameEn: "كفتة رز", mealType: "lunch", mealTypeAr: "غدا", grams: 160, kcal: 325, protein: 19.2, carbs: 28.4, fat: 14.2, source: "أبلة نظيرة ص108", ingredients: "لحم مفروم 80جم + رز مطحون 30جم + صلصة 50جم", notes: "كفتة رز" },
  { id: "eg_21", nameAr: "بامية بلحمة", nameEn: "بامية بلحمة", mealType: "lunch", mealTypeAr: "غدا", grams: 250, kcal: 275, protein: 22.1, carbs: 9.8, fat: 17.2, source: "أبلة نظيرة ص101", ingredients: "بامية 100جم + لحم ضاني 80جم + صلصة 50جم", notes: "بامية" },
  { id: "eg_22", nameAr: "كبدة اسكندراني", nameEn: "كبدة اسكندراني", mealType: "lunch", mealTypeAr: "غدا", grams: 175, kcal: 285, protein: 24.5, carbs: 4.2, fat: 18.3, source: "سكندري ص33", ingredients: "كبدة 120جم + فلفل 40جم + زيت 10جم", notes: "كبدة" },
  { id: "eg_23", nameAr: "رز معمر فلاحي", nameEn: "رز معمر فلاحي", mealType: "lunch", mealTypeAr: "غدا", grams: 195, kcal: 398, protein: 8.2, carbs: 52.3, fat: 17.5, source: "أبلة نظيرة ص65", ingredients: "رز 70جم + لبن 100مل + قشطة 15جم + زبدة 10جم", notes: "معمر" },
  { id: "eg_24", nameAr: "مكرونة بشاميل", nameEn: "مكرونة بشاميل", mealType: "lunch", mealTypeAr: "غدا", grams: 235, kcal: 485, protein: 24.1, carbs: 48.2, fat: 21.4, source: "أبلة نظيرة ص118", ingredients: "مكرونة 70جم + لحم 60جم + لبن 80مل + دقيق 15جم + زبدة 10جم", notes: "بشاميل" },
  { id: "eg_25", nameAr: "فراخ بانيه", nameEn: "فراخ بانيه", mealType: "lunch", mealTypeAr: "غدا", grams: 250, kcal: 420, protein: 28.4, carbs: 32.1, fat: 14.2, source: "حديث", ingredients: "فراخ 120جم + مكرونة 80جم + بقسماط 20جم + زيت 10جم", notes: "بانيه" },
  { id: "eg_26", nameAr: "طاجن تورلي", nameEn: "طاجن تورلي", mealType: "lunch", mealTypeAr: "غدا", grams: 240, kcal: 285, protein: 16.8, carbs: 22.4, fat: 14.5, source: "أبلة نظيرة ص95", ingredients: "كوسة 50جم + بسلة 40جم + جزر 40جم + بطاطس 50جم + لحم 60جم", notes: "تورلي" },
  { id: "eg_27", nameAr: "تونة بالسلطة", nameEn: "تونة بالسلطة", mealType: "dinner", mealTypeAr: "عشا", grams: 150, kcal: 185, protein: 22.1, carbs: 3.2, fat: 9.4, source: "صحي", ingredients: "تونة 80جم + خس 40جم + طماطم 30جم", notes: "تونة لايت" },
  { id: "eg_28", nameAr: "جبنة قريش لايت", nameEn: "جبنة قريش لايت", mealType: "dinner", mealTypeAr: "عشا", grams: 100, kcal: 95, protein: 12, carbs: 2, fat: 4, source: "صحي", ingredients: "قريش 100جم", notes: "دايت" },
  { id: "eg_29", nameAr: "بيض مسلوق 2", nameEn: "بيض مسلوق 2", mealType: "dinner", mealTypeAr: "عشا", grams: 100, kcal: 155, protein: 13, carbs: 1.1, fat: 11, source: "صحي", ingredients: "بيض 100جم", notes: "مسلوق" },
  { id: "eg_30", nameAr: "أم علي", nameEn: "أم علي", mealType: "dessert", mealTypeAr: "حلو", grams: 180, kcal: 385, protein: 8.2, carbs: 48.5, fat: 18.2, source: "أبلة نظيرة ص142", ingredients: "رقاق 40جم + لبن 100مل + مكسرات 15جم + سكر 15جم", notes: "حلو" },
  { id: "eg_31", nameAr: "بلطي مقلي", nameEn: "بلطي مقلي", mealType: "lunch_seafood", mealTypeAr: "غدا بحر", grams: 200, kcal: 285, protein: 28.5, carbs: 8.2, fat: 15.1, source: "سكندري ص71", ingredients: "بلطي 150جم + دقيق 20جم + زيت 15جم", notes: "مقلي" },
  { id: "eg_32", nameAr: "بوري مشوي ردة", nameEn: "بوري مشوي ردة", mealType: "lunch_seafood", mealTypeAr: "غدا بحر", grams: 200, kcal: 265, protein: 32.1, carbs: 4.5, fat: 13.2, source: "بورسعيد", ingredients: "بوري 180جم + ردة 20جم", notes: "مشوي ردة" },
  { id: "eg_33", nameAr: "جمبري مقلي", nameEn: "جمبري مقلي", mealType: "lunch_seafood", mealTypeAr: "غدا بحر", grams: 150, kcal: 245, protein: 26.4, carbs: 6.8, fat: 12.4, source: "سكندري ص84", ingredients: "جمبري 120جم + دقيق 15جم + زيت 15جم", notes: "مقلي" },
  { id: "eg_34", nameAr: "جمبري مسلوق", nameEn: "جمبري مسلوق", mealType: "dinner_seafood", mealTypeAr: "عشا بحر", grams: 150, kcal: 145, protein: 28.2, carbs: 1.2, fat: 2.1, source: "سويسي", ingredients: "جمبري 150جم + كمون", notes: "مسلوق دايت" },
  { id: "eg_35", nameAr: "سبيط مقلي كاليماري", nameEn: "سبيط مقلي كاليماري", mealType: "lunch_seafood", mealTypeAr: "غدا بحر", grams: 150, kcal: 225, protein: 22.8, carbs: 8.4, fat: 11.2, source: "سكندري ص86", ingredients: "سبيط 120جم + دقيق 15جم + زيت 10جم", notes: "كاليماري" },
  { id: "eg_36", nameAr: "صيادية بورسعيدي", nameEn: "صيادية بورسعيدي", mealType: "lunch_seafood", mealTypeAr: "غدا بحر", grams: 250, kcal: 395, protein: 30.2, carbs: 32.5, fat: 15.8, source: "بورسعيد ص15", ingredients: "سمك 150جم + رز صيادية 80جم", notes: "صيادية" },
  { id: "eg_37", nameAr: "طاجن سمك بالطماطم", nameEn: "طاجن سمك بالطماطم", mealType: "lunch_seafood", mealTypeAr: "غدا بحر", grams: 280, kcal: 285, protein: 27.4, carbs: 12.8, fat: 14.1, source: "سكندري ص75", ingredients: "سمك 150جم + طماطم 80جم + بصل 20جم", notes: "طاجن" },
  { id: "eg_38", nameAr: "كابوريا مسلوقة", nameEn: "كابوريا مسلوقة", mealType: "lunch_seafood", mealTypeAr: "غدا بحر", grams: 200, kcal: 165, protein: 30.1, carbs: 0.5, fat: 4.2, source: "سويسي", ingredients: "كابوريا لحم 200جم", notes: "مسلوقة" },
  { id: "eg_39", nameAr: "جندوفلي بالخلطة", nameEn: "جندوفلي بالخلطة", mealType: "lunch_seafood", mealTypeAr: "غدا بحر", grams: 200, kcal: 195, protein: 24.5, carbs: 6.2, fat: 7.8, source: "سكندري ص90", ingredients: "جندوفلي 150جم + بقدونس", notes: "بلح البحر" },
  { id: "eg_40", nameAr: "سردين مملح لايت", nameEn: "سردين مملح لايت", mealType: "dinner_seafood", mealTypeAr: "عشا بحر", grams: 80, kcal: 165, protein: 14.2, carbs: 0, fat: 12.1, source: "بورسعيد", ingredients: "سردين 80جم + ليمون", notes: "مملح" },
  { id: "eg_41", nameAr: "رنجة بطحينة", nameEn: "رنجة بطحينة", mealType: "dinner_seafood", mealTypeAr: "عشا بحر", grams: 120, kcal: 285, protein: 18.4, carbs: 2.1, fat: 22.4, source: "شم النسيم", ingredients: "رنجة 100جم + طحينة 20جم", notes: "رنجة" },
  { id: "eg_42", nameAr: "ماكريل مشوي", nameEn: "ماكريل مشوي", mealType: "lunch_seafood", mealTypeAr: "غدا بحر", grams: 200, kcal: 295, protein: 26.8, carbs: 2.1, fat: 19.2, source: "سويسي", ingredients: "ماكريل 180جم", notes: "مشوي" },
  { id: "eg_43", nameAr: "طاجن جمبري صلصة", nameEn: "طاجن جمبري صلصة", mealType: "lunch_seafood", mealTypeAr: "غدا بحر", grams: 250, kcal: 275, protein: 24.5, carbs: 15.2, fat: 12.8, source: "سكندري", ingredients: "جمبري 120جم + رز 50جم + صلصة 50جم", notes: "طاجن" },
  { id: "eg_44", nameAr: "كشري سمك", nameEn: "كشري سمك", mealType: "lunch_seafood", mealTypeAr: "غدا بحر", grams: 240, kcal: 365, protein: 22.1, carbs: 38.4, fat: 12.2, source: "بورسعيد", ingredients: "رز 80جم + سمك مقلي 100جم", notes: "كشري سمك" },
  { id: "eg_45", nameAr: "شوربة سي فود", nameEn: "شوربة سي فود", mealType: "lunch_seafood", mealTypeAr: "غدا بحر", grams: 300, kcal: 185, protein: 22.4, carbs: 8.2, fat: 6.8, source: "سكندري ص95", ingredients: "جمبري 50جم + سبيط 50جم + كابوريا 50جم + كريمة لايت 50مل", notes: "شوربة" },
  { id: "eg_46", nameAr: "تفاح مصري", nameEn: "تفاح مصري", mealType: "fruit", mealTypeAr: "فاكهة", grams: 78, kcal: 0, protein: 20.6, carbs: 0.3, fat: 0, source: "nan", ingredients: "150جم", notes: "nan" },
  { id: "eg_47", nameAr: "موز بلدي", nameEn: "موز بلدي", mealType: "fruit", mealTypeAr: "فاكهة", grams: 89, kcal: 1, protein: 22.8, carbs: 0.3, fat: 0, source: "nan", ingredients: "100جم", notes: "nan" },
  { id: "eg_48", nameAr: "برتقال بلدي", nameEn: "برتقال بلدي", mealType: "fruit", mealTypeAr: "فاكهة", grams: 70, kcal: 1, protein: 17.4, carbs: 0.2, fat: 0, source: "nan", ingredients: "150جم", notes: "nan" },
  { id: "eg_49", nameAr: "يوسفي", nameEn: "يوسفي", mealType: "fruit", mealTypeAr: "فاكهة", grams: 63, kcal: 1, protein: 15.6, carbs: 0.3, fat: 0, source: "nan", ingredients: "120جم", notes: "nan" },
  { id: "eg_50", nameAr: "جوافة", nameEn: "جوافة", mealType: "fruit", mealTypeAr: "فاكهة", grams: 102, kcal: 3, protein: 21.3, carbs: 1.4, fat: 0, source: "nan", ingredients: "150جم", notes: "nan" },
  { id: "eg_51", nameAr: "مانجو عويسي", nameEn: "مانجو عويسي", mealType: "fruit", mealTypeAr: "فاكهة", grams: 90, kcal: 1, protein: 22.5, carbs: 0.6, fat: 0, source: "nan", ingredients: "150جم", notes: "nan" },
  { id: "eg_52", nameAr: "بطيخ", nameEn: "بطيخ", mealType: "fruit", mealTypeAr: "فاكهة", grams: 60, kcal: 1, protein: 15.1, carbs: 0.3, fat: 0, source: "nan", ingredients: "200جم", notes: "nan" },
  { id: "eg_53", nameAr: "عنب أحمر", nameEn: "عنب أحمر", mealType: "fruit", mealTypeAr: "فاكهة", grams: 82, kcal: 0, protein: 21.6, carbs: 0.2, fat: 0, source: "nan", ingredients: "120جم", notes: "nan" },
  { id: "eg_54", nameAr: "رمان حب", nameEn: "رمان حب", mealType: "fruit", mealTypeAr: "فاكهة", grams: 83, kcal: 1, protein: 18.7, carbs: 1.2, fat: 0, source: "nan", ingredients: "100جم", notes: "nan" },
  { id: "eg_55", nameAr: "فراولة", nameEn: "فراولة", mealType: "fruit", mealTypeAr: "فاكهة", grams: 48, kcal: 1, protein: 11.4, carbs: 0.4, fat: 0, source: "nan", ingredients: "150جم", notes: "nan" },
  { id: "eg_56", nameAr: "كنتالوب", nameEn: "كنتالوب", mealType: "fruit", mealTypeAr: "فاكهة", grams: 68, kcal: 1, protein: 16.2, carbs: 0.4, fat: 0, source: "nan", ingredients: "200جم", notes: "nan" },
  { id: "eg_57", nameAr: "خوخ", nameEn: "خوخ", mealType: "fruit", mealTypeAr: "فاكهة", grams: 46, kcal: 1, protein: 11.6, carbs: 0.3, fat: 0, source: "nan", ingredients: "120جم", notes: "nan" },
  { id: "eg_58", nameAr: "كمثرى", nameEn: "كمثرى", mealType: "fruit", mealTypeAr: "فاكهة", grams: 85, kcal: 0, protein: 22.8, carbs: 0.2, fat: 0, source: "nan", ingredients: "150جم", notes: "nan" },
  { id: "eg_59", nameAr: "تين برشومي", nameEn: "تين برشومي", mealType: "fruit", mealTypeAr: "فاكهة", grams: 59, kcal: 0, protein: 15.2, carbs: 0.2, fat: 0, source: "nan", ingredients: "80جم", notes: "nan" },
  { id: "eg_60", nameAr: "بلح رطب 3 بلحات", nameEn: "بلح رطب 3 بلحات", mealType: "fruit", mealTypeAr: "فاكهة", grams: 166, kcal: 1, protein: 44.7, carbs: 0.2, fat: 0, source: "nan", ingredients: "60جم", notes: "nan" },
  { id: "eg_61", nameAr: "شاي أسود سادة", nameEn: "شاي أسود سادة", mealType: "drink_hot", mealTypeAr: "مشروب سخن", grams: 2, kcal: 0, protein: 0.5, carbs: 0, fat: 0, source: "nan", ingredients: "240مل", notes: "nan" },
  { id: "eg_62", nameAr: "شاي بلبن خالي", nameEn: "شاي بلبن خالي", mealType: "drink_hot", mealTypeAr: "مشروب سخن", grams: 45, kcal: 3, protein: 5, carbs: 0, fat: 0, source: "nan", ingredients: "240مل", notes: "nan" },
  { id: "eg_63", nameAr: "ينسون", nameEn: "ينسون", mealType: "drink_hot", mealTypeAr: "مشروب سخن", grams: 2, kcal: 0, protein: 0.5, carbs: 0, fat: 0, source: "nan", ingredients: "240مل", notes: "nan" },
  { id: "eg_64", nameAr: "كركديه بدون سكر", nameEn: "كركديه بدون سكر", mealType: "drink_hot", mealTypeAr: "مشروب سخن/بارد", grams: 4, kcal: 0, protein: 1, carbs: 0, fat: 0, source: "nan", ingredients: "240مل", notes: "nan" },
  { id: "eg_65", nameAr: "نعناع", nameEn: "نعناع", mealType: "drink_hot", mealTypeAr: "مشروب سخن", grams: 1, kcal: 0, protein: 0.2, carbs: 0, fat: 0, source: "nan", ingredients: "240مل", notes: "nan" },
  { id: "eg_66", nameAr: "قرفة بلبن", nameEn: "قرفة بلبن", mealType: "drink_hot", mealTypeAr: "مشروب سخن", grams: 85, kcal: 3, protein: 10, carbs: 3, fat: 0, source: "nan", ingredients: "240مل", notes: "nan" },
  { id: "eg_67", nameAr: "سحلب", nameEn: "سحلب", mealType: "drink_hot", mealTypeAr: "مشروب سخن", grams: 185, kcal: 4, protein: 24, carbs: 8, fat: 0, source: "nan", ingredients: "200مل", notes: "nan" },
  { id: "eg_68", nameAr: "عصير برتقال فريش", nameEn: "عصير برتقال فريش", mealType: "drink_cold", mealTypeAr: "عصير", grams: 90, kcal: 1, protein: 21, carbs: 0.2, fat: 0, source: "nan", ingredients: "200مل", notes: "nan" },
  { id: "eg_69", nameAr: "عصير جوافة", nameEn: "عصير جوافة", mealType: "drink_cold", mealTypeAr: "عصير", grams: 76, kcal: 1, protein: 18.2, carbs: 0.4, fat: 0, source: "nan", ingredients: "200مل", notes: "nan" },
  { id: "eg_70", nameAr: "عصير مانجو", nameEn: "عصير مانجو", mealType: "drink_cold", mealTypeAr: "عصير", grams: 120, kcal: 0, protein: 28, carbs: 0.3, fat: 0, source: "nan", ingredients: "200مل", notes: "nan" },
  { id: "eg_71", nameAr: "عصير رمان", nameEn: "عصير رمان", mealType: "drink_cold", mealTypeAr: "عصير", grams: 108, kcal: 0, protein: 27, carbs: 0.5, fat: 0, source: "nan", ingredients: "200مل", notes: "nan" },
  { id: "eg_72", nameAr: "ليمونادة سكر خفيف", nameEn: "ليمونادة سكر خفيف", mealType: "drink_cold", mealTypeAr: "عصير", grams: 48, kcal: 0, protein: 12, carbs: 0, fat: 0, source: "nan", ingredients: "200مل", notes: "nan" },
];
