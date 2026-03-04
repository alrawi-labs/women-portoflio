// @/data/blogData.ts
import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] =[
  {
    id:          "1",
    slug:        "java-programlama-2023-2024",
    title:       "Java Programlama 2023-2024 Bahar Dönemi",
    subtitle:    "Sınıflar, OOP Prensipleri ve Temel Java Konseptleri Kapsamlı Rehberi",
    excerpt:     "Java'da Random, Scanner, IO gibi temel sınıflardan başlayarak, Kapsülleme (Encapsulation), Kalıtım (Inheritance), Çok Biçimlilik (Polymorphism) ve Soyutlama (Abstraction) üzerine eksiksiz ders notları.",
    category:    "programming",
    tags:        ["Java", "OOP", "Backend", "Programming"],
    coverImage:  "https://private-user-images.githubusercontent.com/204489698/438293097-381f101c-9f06-41a6-a4fb-bfd975f46210.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzIzMDk1ODMsIm5iZiI6MTc3MjMwOTI4MywicGF0aCI6Ii8yMDQ0ODk2OTgvNDM4MjkzMDk3LTM4MWYxMDFjLTlmMDYtNDFhNi1hNGZiLWJmZDk3NWY0NjIxMC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMjI4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDIyOFQyMDA4MDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04MmIyM2E4YTE2ZDZjMmRmYmE4ODJkNjcwYTBkODYyYjkwN2E4ZmQ2YWEwZjZjODJlNGJlZGZjNzhhYWUyZDQ4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.EJUn6jiyNa8yJ2bM61SmDy_UG8Fgftt20at0vwJvzmk",
    author: {
      name:   "Sedanur Alrawi",
      avatar: "https://private-user-images.githubusercontent.com/204489698/438293097-381f101c-9f06-41a6-a4fb-bfd975f46210.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzIzMDk1ODMsIm5iZiI6MTc3MjMwOTI4MywicGF0aCI6Ii8yMDQ0ODk2OTgvNDM4MjkzMDk3LTM4MWYxMDFjLTlmMDYtNDFhNi1hNGZiLWJmZDk3NWY0NjIxMC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMjI4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDIyOFQyMDA4MDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04MmIyM2E4YTE2ZDZjMmRmYmE4ODJkNjcwYTBkODYyYjkwN2E4ZmQ2YWEwZjZjODJlNGJlZGZjNzhhYWUyZDQ4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.EJUn6jiyNa8yJ2bM61SmDy_UG8Fgftt20at0vwJvzmk",
      title:  "Full Stack Developer",
    },
    publishedAt: "2024-05-01",
    readingTime: 45,
    isFeatured:  true,
    contentBlocks:[
      {
        type: 0,
        content: `**Burada bahsedilen tüm sınıfların ve daha fazlasının ilgili örnek kodları yukarıdaki yüklediğim \`ornekler.java\` dosyasında bulunmaktadır.**`,
      },
      {
        type: 0,
        heading: "1. `Random` Sınıfı",
        content: `Java'da rastgele sayılar üretmek için kullanılan bir sınıftır. Bu sınıf, genellikle oyunlar, simülasyonlar, rastgele seçimler ve diğer birçok uygulama için rastgele sayılara ihtiyaç duyulan durumlarda kullanılır.\n\nKütüphanesini eklemek için şu kodu kullanabilirsiniz:`,
      },
      {
        type: 2,
        language: "java",
        code: `import java.util.Random;`,
      },
      {
        type: 0,
        content: `\`main\` metodunda kullanımı, 0,1 rakamları rastgele seçecek`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main(String[] args) {\n  Random rand = new Random();\n  int num = rand.nextInt(2);\n}`,
      },
      {
        type: 0,
        content: `**sabit bir sayı ile kullanımı**\n\n- \`0 ile 10\` arasında seçim yapmak için`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main(String[] args) {\n  final int MAX = 10;\n  Random rand = new Random();\n  int num = rand.nextInt(MAX) + 1;\n}`,
      },
      {
        type: 0,
        content: `- \`5 ile 15\` arasında seçim yapmak için`,
      },
      {
        type: 2,
        language: "java",
        code: `final int MAX = 15;\nfinal int MIN = 5;\nRandom rand = new Random();\nint randomNumber = rand.nextInt((MAX - MIN) + 1) + MIN;`,
      },
      {
        type: 0,
        content: `**Önemli metotlar**`,
      },
      {
        type: 2,
        language: "java",
        code: `int randomNumber = rand.nextInt(100); // 0 ile 99 arasında rastgele bir tamsayı üretir\ndouble randomDouble = rand.nextDouble(); // 0.0 ile 1.0 arasında rastgele bir ondalıklı sayı üretir\nboolean randomBoolean = rand.nextBoolean(); // true veya false değerlerinden birini rastgele olarak üretir\nfloat randomFloat = rand.nextFloat(); // 0.0 ile 1.0 arasında bir float sayı üretir.`,
      },
      {
        type: 0,
        heading: "2. `Scanner` Sınıfı",
        content: `Java'da kullanıcıdan girdi almak için kullanılan bir sınıftır. Kullanıcıdan klavyeden girdi almak için yaygın olarak kullanılır. Scanner sınıfı, bir girdi akışı üzerinde işlem yapmak için çeşitli yöntemler sağlar ve bu yöntemlerle tamsayılar, ondalıklı sayılar, metin gibi farklı türlerde verileri okuyabiliriz.\n\nKütüphanesini eklemek için şu kodu kullanabilirsiniz:`,
      },
      {
        type: 2,
        language: "java",
        code: `import java.util.Scanner;`,
      },
      {
        type: 0,
        content: `\`main\` metodunda kullanımı, kullanıcıdan bir string değeri almak için kullanımı`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main(String[] args) {\n  Scanner scan = new Scanner(System.in);\n  System.out.print("Enter your name : ");\n  String name = scan.nextLine();\n}`,
      },
      {
        type: 0,
        content: `**Önemli metotlar**`,
      },
      {
        type: 2,
        language: "java",
        code: `int number = scan.nextInt(); // Klavyeden bir tamsayı girdisi okur\ndouble decimal = scan.nextDouble(); // Klavyeden bir ondalıklı sayı girdisi okur\nString text = scan.nextLine(); // Klavyeden bir metin girdisi okur\nBoolean bol = scan.nextBoolean(); // Bir boolean değer okur. Kabul edilen değerler "true" veya "false" (büyük/küçük harf duyarlı değildir).\nfloat f = scan.nextFloat(); // Bir float değeri okur.`,
      },
      {
        type: 0,
        heading: "3. `DecimalFormat` Sınıfı",
        content: `Java'da sayıları biçimlendirmek için kullanılan bir sınıftır. Bu sınıf, özel sayı biçimlendirme desenleri kullanarak sayıları belirli bir biçimde biçimlendirmenizi sağlar. Örneğin, ondalık sayıları belirli bir sayıda basamakla veya belirli bir desende biçimlendirebilirsiniz.\n\nÖnemli bir nokta olarak, bu işlevin dönüş değeri \`java.lang.String\` türündedir\n\nKütüphanesini eklemek için şu kodu kullanabilirsiniz:`,
      },
      {
        type: 2,
        language: "java",
        code: `import java.text.DecimalFormat;`,
      },
      {
        type: 0,
        content: `\`main\` metodunda kullanımı, noktadan sonra 2 basamak kalacak şekilde yuvarlamak için kullanımı`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main(String[] args) {\n  DecimalFormat df = new DecimalFormat("#.##");\n  double number = 123.456;\n  System.out.println(df.format(number));\n}`,
      },
      {
        type: 0,
        heading: "4. `NumberFormat` Sınıfı",
        content: `Java'da sayıların biçimlendirilmesi için kullanılan bir sınıftır. Bu sınıf, sayıların biçimlendirilmesi ve yerel ayarlar göz önünde bulundurularak uygun biçimde görüntülenmesi için çeşitli yöntemler sağlar. Örneğin, sayıların virgül ile ayrılması, ondalık kısmın görüntülenmesi, binlik ayırıcının kullanılması gibi özellikler bu sınıf tarafından sağlanır.\n\nKütüphanesini eklemek için şu kodu kullanabilirsiniz:`,
      },
      {
        type: 2,
        language: "java",
        code: `import java.text.NumberFormat;`,
      },
      {
        type: 0,
        content: `\`main\` metodunda kullanımı, yüzde değerlerini biçimlendirmek için NumberFormat sınıfının bir örneğini döndürür, bunun için \`getPercentInstance\` metodu kullanılır.`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main(String[] args) {\n  double ratio = 0.75;\n  NumberFormat nf = NumberFormat.getPercentInstance();\n  System.out.println(nf.format(ratio)); // output: 75%\n}`,
      },
      {
        type: 0,
        content: `belirli bir biçimlendirme için şu kütüphane eklenmeli`,
      },
      {
        type: 2,
        language: "java",
        code: `import java.util.Locale;`,
      },
      {
        type: 0,
        content: `\`Türk\` standartlarına göre para birimi biçimlendirme`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main(String[] args) {\n  double amount = 1234.56; // Miktarı temsil eden örnek bir sayı\n  \n  // Türk biçimlendirme ayarlarına sahip bir para birimi biçimlendirme örneği oluştur\n  NumberFormat turkishCurrencyFormat = NumberFormat.getCurrencyInstance(Locale.forLanguageTag("tr-TR"));\n  \n  // Miktarı Türk Lirası cinsinden biçimlendir\n  String formattedAmount = turkishCurrencyFormat.format(amount);\n  System.out.println("Biçimlendirilmiş Miktar: " + formattedAmount); // Output: Biçimlendirilmiş Miktar: 1.234,56 ₺\n}`,
      },
      {
        type: 0,
        heading: "5. `IO` Sınıfı",
        content: `Java'da IO (Input/Output) sınıfı, giriş/çıkış işlemlerini yönetmek için kullanılan bir sınıf kümesini ifade eder. Java'da IO sınıfı, veri akışlarını işlemek, \`dosyalardan okuma/yazma yapmak\`, ağ üzerinden veri iletişimi gerçekleştirmek gibi çeşitli giriş/çıkış işlemlerini kolaylaştırır.\n\nKütüphanesini eklemek için şu kodu kullanabilirsiniz:`,
      },
      {
        type: 2,
        language: "java",
        code: `java.io.*;`,
      },
      {
        type: 0,
        content: `\`* işareti\`, bu sınıfa ait tüm metotları tanımlamak anlamına gelmektedir.\n\nJava dilinde \`throws IOException\` ifadesi, bir metodunun hata durumlarını belirtmek için kullanılır. Bu ifade, bir metodun içinde \`IOException\` adlı bir istisna (exception) fırlatılabileceğini gösterir. IOException, giriş/çıkış işlemleri sırasında ortaya çıkabilecek bir hata türüdür. Bu hata, dosya okuma/yazma işlemlerinde dosyanın bulunamaması, erişim izinlerinin olmaması gibi durumlarda ortaya çıkabilir.\n\nMetodun kullanımı, metod imzasının hemen yanında yer alır.`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void URLDissector() throws IOException{\n}`,
      },
      {
        type: 0,
        content: `bir dosya okuma örneği:\nEğer java.IO sınıfa ait olan tüm metotları çağırmak istemezsek, sadece gerekli metodlar çağırmak istersek dosya okumak için bu şekilde yazbiliriz\n\ngerekli tanımlamalar:`,
      },
      {
        type: 2,
        language: "java",
        code: `import java.io.BufferedReader;\nimport java.io.FileReader;\nimport java.io.IOException;`,
      },
      {
        type: 0,
        content: `\`main\` metodunda kullanımı, dosya.txt adlı bir dosyayı okumak için FileReader kullanılır`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main(String[] args) {\n  try {\n          // Okunacak dosyanın yolunu belirtin\n          String dosyaYolu = "dosya.txt";\n    \n          // FileReader ile dosyayı oku\n          FileReader fileReader = new FileReader(dosyaYolu);\n    \n          // BufferedReader ile FileReader'ı kullanarak dosyayı satır satır oku\n          BufferedReader bufferedReader = new BufferedReader(fileReader);\n    \n          // Dosyadan okunan satırı tutacak değişken\n          String satir;\n    \n          // Dosya sonuna kadar oku ve her satırı konsola yazdır\n          while ((satir = bufferedReader.readLine()) != null) {\n            System.out.println(satir);\n          }\n    \n          // Kullanılan kaynakları serbest bırak\n          ufferedReader.close();\n   } catch (IOException e) {\n          ystem.out.println("Dosya okuma hatası: " + e.getMessage());\n   }\n}`,
      },
      {
        type: 0,
        heading: "`useDelimiter` metodu",
        content: `Bir Scanner nesnesinin girdi dizesini parçalamak için kullanılan bir deseni belirtmenizi sağlar. Yani, girdi dizesini belirli bir desene göre böler ve parçalara ayırır. Bu desen, bir karakter veya karakter dizisi olabilir.\nÖrneğin, bir metin dosyasındaki her satırı okurken, her satırı boşluk karakterine göre parçalamak istiyorsanız, useDelimiter metodunu boşluk karakteriyle çağırabilirsiniz:`,
      },
      {
        type: 2,
        language: "java",
        code: `Scanner scanner = new Scanner(dosya);\nscanner.useDelimiter(" ");`,
      },
      {
        type: 0,
        content: `Bu durumda, her çağrıda next() veya nextLine() metodu, bir sonraki boşluk karakterine kadar olan kısmı döndürecektir. Bu şekilde, girdi dizesini istediğiniz şekilde parçalayabilir ve işleyebilirsiniz.\n\n\`useDelimiter\` için bir örnek:\n\ndosya.txt:`,
      },
      {
        type: 2,
        language: "text",
        code: `Java,Python,C++,JavaScript\nHTML,CSS,JavaScript,TypeScript\nC#,Java,Python,Ruby`,
      },
      {
        type: 0,
        content: `\`main\` metodu:`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main(String[] args) {\n  try {\n    String dosyaYolu = "dosya.txt";\n\n    File dosya = new File(dosyaYolu);\n    Scanner scanner = new Scanner(dosya);\n    scanner.useDelimiter(",");\n\n    while (scanner.hasNext()) {\n      String token = scanner.next();\n      System.out.println(token);\n    }\n\n    scanner.close();\n    } catch (FileNotFoundException e) {\n      System.out.println("Dosya bulunamadı: " + e.getMessage());\n    }\n}`,
      },
      {
        type: 0,
        content: `Output:`,
      },
      {
        type: 2,
        language: "text",
        code: `Java\nPython\nC++\nJavaScript\nHTML\nCSS\nJavaScript\nTypeScript\nC#\nJava\nPython\nRuby`,
      },
      {
        type: 0,
        content: `Dosya 3 satırdan oluşuyor ve her bir dil virgülle ayrılmış olarak yazılmış. Ancak çıktıda her bir satır hem satır başı karakterine hem de virgüle göre ayrılmış. UseDelimiter kullanılmasaydı, 3 satır olarak yazdırılacaktı.\n\n**Önemli metotlar**`,
      },
      {
        type: 2,
        language: "java",
        code: `// Metin dosyasından okuma ve yazma işlemleri için kullanılan sınıflar\nimport java.io.BufferedReader;\nimport java.io.BufferedWriter;\nimport java.io.FileReader;\nimport java.io.FileWriter;\n\n// Dosya işlemleri için temel sınıf\nimport java.io.File;\n\n// Bayt tabanlı giriş ve çıkış işlemleri için temel soyut sınıflar\nimport java.io.FileInputStream;\nimport java.io.FileOutputStream;\nimport java.io.InputStream;\nimport java.io.OutputStream;\n\n// Karakter tabanlı giriş ve çıkış işlemleri için temel soyut sınıflar\nimport java.io.InputStreamReader;\nimport java.io.OutputStreamWriter;\n\n// Yazdırma işlemleri için sınıf\nimport java.io.PrintWriter;\n\n// Nesnelerin serileştirilmesi için arayüz\nimport java.io.Serializable;\n\n// IO işlemlerinde oluşabilecek istisnalar için sınıf\nimport java.io.IOException;`,
      },
      {
        type: 0,
        heading: "6. `ArrayList` Sınıfı",
        content: `- Bir ArrayList nesnesi, ihtiyaç duyulduğunda büyür ve küçülür, gerektiğinde kapasitesini ayarlar.\n- ArrayList'in index değerleri 0'dan başlar.\n- Ekleme ve silme işlemlerine göre indexler ayarlanır.\n\nKütüphanesini eklemek için şu kodu kullanabilirsiniz:`,
      },
      {
        type: 2,
        language: "java",
        code: `import java.util.ArrayList;`,
      },
      {
        type: 0,
        content: `Listede depolanan nesnenin türü, ArrayList nesnesi oluşturulurken belirlenir:`,
      },
      {
        type: 2,
        language: "java",
        code: `ArrayList<String> names = new ArrayList<String>();\nArrayList<int> numbers = new ArrayList<int>();\nArrayList<Book> books = new ArrayList<Book>();\nArrayList<ogrenci> ogrenciler = new ArrayList<ogrenci>();`,
      },
      {
        type: 0,
        content: `\`Örnek:\` Bir grup üyeleri listesini ArrayList içinde saklayan ve güncelleyen bir program:`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main (String[] args)\n{\n  ArrayList<String> band = new ArrayList<String>();\n  band.add("Paul");\n  band.add("Pete");\n  band.add("John");\n  band.add("George");\n  System.out.println(band);\n  int location = band.indexOf("Pete");\n  band.remove (location);\n  System.out.println(band);\n  System.out.println("At index 1: " + band.get(1));\n  band.add(2, "Ringo");\n  System.out.println("Size of the band: " + band.size());\n  int index = 0;\n  while (index < band.size())\n  {\n    System.out.println(band.get(index));\n    index++;\n  }\n}`,
      },
      {
        type: 0,
        content: `**Önemli metotlar**`,
      },
      {
        type: 2,
        language: "java",
        code: `// ArrayList oluşturma\nArrayList<String> myList = new ArrayList<String>();\n\n// boolean add(E obj): Belirtilen öğeyi listenin sonuna ekler.\nboolean added = myList.add("Bashful");\n\n// void add(int index, E obj): Belirtilen konuma belirtilen öğeyi ekler.\nmyList.add(1, "Sleepy");\n\n// Object remove(int index): Belirtilen konumda bulunan öğeyi listeden kaldırır.\nObject removed = myList.remove(0);\n\n// Object get(int index): Belirtilen konumdaki öğeyi döndürür.\nObject element = myList.get(0);\n\n// boolean isEmpty(): Liste boş mu diye kontrol eder.\nboolean empty = myList.isEmpty();\n\n// int size(): Listenin boyutunu döndürür.\nint size = myList.size();`,
      },
      {
        type: 0,
        heading: "7. `swing` Kütüphanesi",
        content: `Java programlama dilinde GUI (Graphical User Interface - Grafiksel Kullanıcı Arayüzü) bileşenlerini oluşturmak için kullanılan bir kütüphanedir. Java'nın standart sınıf kitaplığının bir parçasıdır ve Java'nın platform bağımsız yapısıyla uyumlu olarak çalışır. Swing, pencere, düğme, metin kutusu gibi GUI bileşenlerini oluşturmanın yanı sıra, kullanıcı etkileşimine yönelik olayları işlemek ve farklı temalarda ve stillerde GUI'ler oluşturmak için birçok araç sağlar.\n\n### **\`JOptionPane\`** sınıfı:\nJava Swing kütüphanesinde bulunan ve temel iletişim kutuları oluşturmayı ve kullanmayı kolaylaştıran bir sınıftır. JOptionPane sınıfı, kullanıcıya bilgi iletmek, bir eylemi onaylamak veya kullanıcıdan bilgi almak gibi çeşitli amaçlarla kullanılabilir. Basit bir arayüze sahiptir ve kullanıcı dostu iletişim kutuları oluşturmak için kullanılabilir.\n\nJOptionPane ile oluşturulan iletişim kutuları, metin içeriği, simgeler, düğmeler ve giriş alanları gibi çeşitli öğeler içerebilir. Kullanıcıya belirli bir mesajı iletmek veya belirli bir eylemi gerçekleştirmesini istemek için kullanılabilirler.\n\nkütüphaneyi eklemek bu şekilde:`,
      },
      {
        type: 2,
        language: "java",
        code: `import javax.swing.JOptionPane;`,
      },
      {
        type: 0,
        content: `kütüphaneyi eklerken \`The package javax.swing is not accessible\` veya \`The type import javax.swing.JOptionPane is not accessible\` gibi hatalar çıkarsa çözümü bu şekilde olur:`,
      },
      {
        type: 2,
        language: "text",
        code: `Properties -> Java Build Path -> Libraries -> Modulepath -> Add Libraries... -> JRE System Library -> Next -> Execution environment: -> CDC-1.0/Foundation-1.0 (jdk-17.0.2) -> Finish -> Apply -> Apply and Close`,
      },
      {
        type: 0,
        content: `Bu şekilde hata çözülmüş olur ve kütüphaneyi ekleyebilirsiniz, ancak bu adımları uyguladıktan sonra halihazır kodunuzda \`Syntax error, varargs are only available if source level is 1.5 or greater\` gibi hatasını alırsanız çözümü bu şekilde:`,
      },
      {
        type: 2,
        language: "text",
        code: `Properties -> Java Compiler -> Finally set the Compiler compliance level to 1.5 or more`,
      },
      {
        type: 0,
        content: `Uyguladıktan sonra yine hata alıyorsanız projenizi \`Rebuild\` etmeyi deneyin.\n\n\`main\` metodu: Kullanıcıdan bir sayı alarak, girilen sayının çift mi yoksa tek mi olduğunu kontrol eden ve sonucu kullanıcıya bildiren bir program`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main(String[] args) {\n  String numStr, result;\n  int num, again;\n    \n  do {\n    numStr = JOptionPane.showInputDialog("Enter an integer");\n    num = Integer.parseInt(numStr);\n      \n    result = "That number is " + ((num % 2 == 0) ? "even" : "odd");\n      \n    JOptionPane.showMessageDialog(null, result);\n    again = JOptionPane.showConfirmDialog(null, "Do Another?");\n  } while (again == JOptionPane.YES_OPTION);\n}`,
      },
      {
        type: 0,
        content: `**Önemli metotlar**\n\n\`1. showInputDialog:\` Belirtilen mesajı içeren bir giriş kutusu gösterir ve kullanıcıdan bir metin girmesini bekler. Kullanıcının girdiği metin geri döndürülür.`,
      },
      {
        type: 2,
        language: "java",
        code: `static String showInputDialog(Object message) {\n}`,
      },
      {
        type: 0,
        content: `\`2. showMessageDialog:\` Belirtilen bileşenin altında bir iletişim kutusu görüntüler. Kullanıcıya bir mesaj göstermek için kullanılır.`,
      },
      {
        type: 2,
        language: "java",
        code: `static void showMessageDialog(Component parent, Object message) {\n}`,
      },
      {
        type: 0,
        content: `\`3. showConfirmDialog:\` Belirtilen bileşenin altında bir onay kutusu görüntüler. Kullanıcıdan bir onay almak için kullanılır.`,
      },
      {
        type: 2,
        language: "java",
        code: `static int showConfirmDialog(Component parent, Object message) {\n}`,
      },
      {
        type: 0,
        content: `\`4. showOptionDialog:\` Belirtilen bileşenin altında bir seçenek kutusu görüntüler. Kullanıcıdan bir seçenek seçmesini bekler.`,
      },
      {
        type: 2,
        language: "java",
        code: `static int showOptionDialog(Component parent, Object message, String title, int optionType, int messageType, Icon icon, Object[] options, Object initialValue) {\n}`,
      },
      {
        type: 0,
        heading: "8. `String` Sınıfı",
        content: `- String bir değişken değildir, bir \`objedir\`\n- \`for\` döngüsü içinde String'e ekleme işlemi yapmak, \`çok maliyetli\` bir yaklaşımdır.\n- Bir String'in değeri çift tırnak içinde belirtilir: \` " \`.\n- Karakter (char) değişkenleri için tek tırnak içinde belirtilir: \` ' \` ve Stringler için kullanılmaz.\n#### İki şekilde tanımlanabilir:`,
      },
      {
        type: 2,
        language: "java",
        code: `String st = "Sarı Kırmızı, Ateş ve Aslan";`,
      },
      {
        type: 2,
        language: "java",
        code: `String st = new String("Sarı Kırmızı, Ateş ve Aslan");`,
      },
      {
        type: 0,
        content: `**Önemli metotlar**\n* __\`new\` method:__ yeni obje üretmek için kullanılır.`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main (String[] args)\n{\n  String takim1 = new String("Galatasaray");\n  String takim2 = new String(takim1);\n}`,
      },
      {
        type: 0,
        content: `* __\`charAt\` method:__ bir karaktere ulaşmak için kullanılır. index'i integer olarak parametre alır.`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main (String[] args)\n{\n  String takim = new String("Galatasaray");\n  char c = takim.charAt(6);\n  System.out.println(c); // Output: s\n}`,
      },
      {
        type: 0,
        content: `* __\`compareTo\` method:__ bir nesneyi diğerine göre sıralamak için kullanılır.\n\nJava karakter verisi Unicode karakter kümesine dayanır. Unicode, her karakter için belirli bir sayısal değer belirler ve bu nedenle bir sıralama sağlar. Bu sıralamaya dayanarak karakter verileri üzerinde ilişkisel operatörler kullanabiliriz\n\n| karakter | Unicode |\n| --------- | ------- |\n| 0 - 9     | 48 - 57 |\n| A - Z     | 65 - 90 |\n| a - z     | 97 - 122|\n\nYukarıdaki tabloya göre bu sonuçları elde edebiliriz`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main (String[] args)\n{\nint r;\n  String takim1 = "Galatasaray";\n  String takim2 = "Galatasaray";\n		\n  // iki string aynı ise 0 döndürür\n  r = takim1.compareTo(takim2); // 0 döndürür\n		\n  takim1 = "Galatasaray";\n  takim2 = "galatasaray";\n		\n  // Eğer parametre olan daha büyük Unicode'a sahipse, negatif bir değer döndürür\n  r = takim1.compareTo(takim2); // Negatif bir değer döndürür\n\n  takim1 = "galatasaray";\n  takim2 = "Galatasaray";\n		\n  // Eğer parametre olan daha küçük Unicode'a sahipse, pozitif bir değer döndürür\n  r = takim1.compareTo(takim2); // Pozitif bir değer döndürür		\n}`,
      },
      {
        type: 0,
        content: `* __\`concat\` method:__ iki stringi birleştirmek için kullanılır.`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main (String[] args)\n{\n  String takim1 = "Galata";\n  String takim2 = "saray";\n	\n  String takim = takim1.concat(takim2);\n  System.out.println(takim); // Output: Galatasaray\n}`,
      },
      {
        type: 0,
        content: `* __\`equals\` method:__  iki nesnenin aynı olup olmadığını kontrol eder.`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main (String[] args)\n{\n  String takim1 = "Galatasaray";\n  String takim2 = "Galatasaray";\n  \n  boolean b = takim1.equals(takim2);\n  System.out.println(b); // Output: true\n}`,
      },
      {
        type: 0,
        content: `* __\`equalsIgnoreCase\` method:__  iki String'i büyük harf-küçük harf farkını göz ardı ederek karşılaştırır.`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main (String[] args)\n{\n  String takim1 = "Galatasaray"; // G büyük\n  String takim2 = "galatasaray"; // g küçük\n  \n  boolean b1 = takim1.equals(takim2);\n  System.out.println(b1); // Output: false\n		\n  boolean b2 = takim1.equalsIgnoreCase(takim2);\n  System.out.println(b2); // Output: true\n}`,
      },
      {
        type: 0,
        content: `* __\`length\` method:__  bir String'in uzunluğunu döndürür.`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main (String[] args)\n{\n  String takim = "Galatasaray"; \n  \n  int length = takim.length();\n  System.out.println(length); // Output: 11\n}`,
      },
      {
        type: 0,
        content: `* __\`replace\` method:__ bir String içinde belirtilen bir karakteri başka bir karakterle değiştirmek için kullanılır.`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main (String[] args)\n{\n  String takim1 = "galatasaray"; \n		\n  String takim2 = takim1.replace('g', 'G');\n  System.out.println(takim2); // Output: Galatasaray\n  \n  String takim3 = takim1.replace('a','A');\n  System.out.println(takim3); // Output: gAlAtAsArAy\n}`,
      },
      {
        type: 0,
        content: `* __\`substring\` method:__ bir String'in belirli bir aralığındaki karakterleri almak için kullanılır.`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main (String[] args)\n{\n  String takim = "Galatasaray";\n  \n  String subTakim1 = takim.substring(6); // 7. indexten sonuna kadar\n  System.out.println(subTakim1); // Output: saray\n  \n  String subTakim2 = takim.substring(3, 6); // 3 dahil, 6 dahil değil\n  System.out.println(subTakim2); // Output: ata\n}`,
      },
      {
        type: 0,
        content: `* __\`toLowerCase\` method:__ bir String'in tüm harflerini küçük harfe dönüştürür.`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main (String[] args)\n{\n  String takim1 = "GalataSaray"; // G ve S büyük harfler\n  \n  String takim2 = takim1.toLowerCase();\n  \n  System.out.println(takim2); // Output: galatasaray\n}`,
      },
      {
        type: 0,
        content: `* __\`toUpperCase\` method:__ bir String'in tüm harflerini büyük harfe dönüştürür.`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main (String[] args)\n{\n  String takim1 = "Galatasaray"; // sadece G büyük harfler\n  \n  String takim2 = takim1.toUpperCase();\n  \n  System.out.println(takim2); // Output: GALATASARAY\n}`,
      },
      {
        type: 1,
        imageUrl: "https://private-user-images.githubusercontent.com/204489698/438293097-381f101c-9f06-41a6-a4fb-bfd975f46210.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzIzMDk1ODMsIm5iZiI6MTc3MjMwOTI4MywicGF0aCI6Ii8yMDQ0ODk2OTgvNDM4MjkzMDk3LTM4MWYxMDFjLTlmMDYtNDFhNi1hNGZiLWJmZDk3NWY0NjIxMC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMjI4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDIyOFQyMDA4MDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04MmIyM2E4YTE2ZDZjMmRmYmE4ODJkNjcwYTBkODYyYjkwN2E4ZmQ2YWEwZjZjODJlNGJlZGZjNzhhYWUyZDQ4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.EJUn6jiyNa8yJ2bM61SmDy_UG8Fgftt20at0vwJvzmk",
        caption:  "Notion'da Aç",
      },
      {
        type: 0,
        heading: "🏛️ Classes",
        content: `Daha önce \`Scanner\`, \`ArrayList\` ve \`String\` gibi classları kullanıyorduk. Ancak şimdi kendi classlarımızı biz yazmaya başlayacağız.\n\nBir sınıf oluştururken, başlangıçta hangi özelliklerin alacağını ve hangilerinin zorunlu veya isteğe bağlı olduğunu belirlememiz gerekiyor. Dışarıdan erişilebilir olması gereken özellikleri genellikle \`public\` olarak tanımlarız. Ancak, dışarıdan erişilmemesini istediğimiz özellikleri \`private\` olarak tanımlarız ve bu özelliklere sadece sınıfın içinden erişim sağlarız.\n\nBazı özelliklerin dışarıdan değiştirilebilmesini isteyebiliriz, ancak bu durumda bile, Kapsülleme mantığından faydalanarak özelliği \`private\` olarak tanımlarız ve \`set\`/\`get\` metotlarıyla erişim sağlarız.\n\n**Peki, neden bir değişkeni hemen \`public\` olarak tanımlayıp dışarıdan erişmesine izin verebilirken, bunu \`private\` olarak tanımlayıp \`set\` ve \`get\` metotları ile erişmeye açıyoruz?**\n\nAslında, her iki durumda da değişkene erişebiliriz. Ancak, bu yaklaşımlar arasında önemli bir fark var. Direkt olarak public olarak tanımlayıp atama yaparsak, hiçbir kısıtlama olmadan herhangi bir değer atanabilir ve bu güvenlik açısından risk oluşturabilir. Oysa ki, set metodu içinde değeri kontrol edip uygun kısıtlamaları sağladıktan sonra atanmasını sağlarız. Bu sayede, atama işlemi öncesinde veriyi kontrol edebilir ve gerekli güvenlik önlemlerini alabiliriz.\n\n## Örnek\n\nBir zar düşünelim; bu zarın üst yüzü olduğunu ve her atışta rastgele bir değer alacağını biliyoruz. Ayrıca, elimizde hareket ettirerek istediğimiz değeri üst yüz yapabileceğimizi ve bu üst yüzün değerini görebileceğimizi varsayalım. Şimdi, bu zarı sınıflarla nasıl temsil edebiliriz?\n\n### Tanımlama\n\nBir zar dediği için ben zar için bir sınıf oluşturmam gerek demek:`,
      },
      {
        type: 2,
        language: "java",
        code: `class zar{\n\n}`,
      },
      {
        type: 0,
        content: `### Özellikleri Tanımlama\n\nÜst yüzü için bir değişken tanımlamanın gerekliliğini hemen anlarız. Ancak, ek olarak 'MAX' adında bir değişken daha tanımlarsak işlemleri kolaylaştırırız. Bu 'MAX' değişkeninin sabit bir değeri olmalı, yani 6. Böylece, üst yüzün alabileceği maksimum değerin 6 olmasını sağlarız. Aynı zamanda bu değişkenler \`private\` olmalılar ki dışarıdan erişilmez olsunlar.`,
      },
      {
        type: 2,
        language: "java",
        code: `class zar{\n	private final int MAX = 6;\n	private int ustYuz;\n}`,
      },
      {
        type: 0,
        content: `### Constructor ( Yapılandırıcı ) Metodu\n\nPeki, \`zar\` sınıfından bir nesne ilk oluşturulduğunda, \`ustYuz\` değişkeninin değerini kullanıcıdan zorunlu olarak mı alacağımızı yoksa isteğe bağlı mı olacağını düşünebiliriz. Ayrıca, bu değeri kullanıcıdan mı alacağımızı yoksa varsayılan bir değer mi atayacağımızı da belirlemeliyiz. Bu örnekte, \`zar\` sınıfından bir nesne ilk üretildiğinde \`ustYuz\` değişkeninin değerini varsayılan olarak 1 olarak atayacağım.`,
      },
      {
        type: 2,
        language: "java",
        code: `public zar() {\n		ustYuz = 1;\n}`,
      },
      {
        type: 0,
        content: `### Atama Metodu\n\nAtama metodu tanımlarken ilk bu metot bir değer mi döndürecek yoksa sadece işlem yapacak. Tanımlayacağımız metot sadece atama işlemini yapması gerektiği için onu \`void\` olarak tanımlayacağız.`,
      },
      {
        type: 2,
        language: "java",
        code: `public void atama() {\n	ustYuz = (int) (Math.random() * MAX) + 1;\n}`,
      },
      {
        type: 0,
        content: `\`Math.random()\` metodu 0 (dahil) ile 1 (hariç) arasında rastgele bir ondalık sayı üretir. MAX değişkenimizin değeri 6 ise \`(Math.random() * MAX)\` bu komut hiçbir zaman 6 üretemez çünkü 1 olamayacak ancak eğer ona \`+ 1\` yazarsak hem 6 değerini üretmiş olduk hem de 0 olma durumunu engellemiş oluruz.\n\n### Set Metodu\n\nBiz örnekte bu zarı elimizde hareket ettirerek istediğimiz değeri üst yüz yapabileceğimizi söylemiştir. işte onu istediğimiz değer atamak \`set\` demek oluyor.`,
      },
      {
        type: 2,
        language: "java",
        code: `public void setUstYuzu(int ustYuz) {\n	if (ustYuz <= MAX && ustYuz > 0)\n		this.ustYuz = ustYuz;\n}`,
      },
      {
        type: 0,
        content: `Ancak elimizde hareket ettirdiğimizde sadece 1 ile 6 arasında üst yüzü yapabiliriz. Bu yüzden  atama yaparken kontrol etmemiz gerek.\n\n### Get Metodu\n\nAynı zamanda üst yüzünü görebildiğimizi de söylemiştik işte bu da \`get\` metodu üst yüzünü görmemizi sağlayacaktır.`,
      },
      {
        type: 2,
        language: "java",
        code: `public int getUstYuzu() {\n	return ustYuz;\n}`,
      },
      {
        type: 0,
        content: `\`getUstYuzu\` metodu \`ustYuzu\` değerini getirir ancak ekrana yazdırmaz, üzerinde işlem yapmak için kullanılır.\n\n### toString Metodu\n\nSınıftan bir nesne oluşturduğumuzda ve bu nesneyi yazdırdığımızda, üst yüzünün değerini görmek istiyoruz. Bu nedenle, \`toString()\` metodunu kullanarak bu değeri yazdıracağız.`,
      },
      {
        type: 2,
        language: "java",
        code: `public String toString() {\n	String sonuc = Integer.toString(ustYuz);\n	return sonuc;\n}`,
      },
      {
        type: 0,
        content: `### zar Sınıfı\n\nYukarıda yazdığımız tüm kodları bir araya topladığımızda \`zar\` sınıfı bu şekilde olacaktır`,
      },
      {
        type: 2,
        language: "java",
        code: `class zar {\n	private final int MAX = 6;\n	private int ustYuz;\n\n	public zar() {\n		ustYuz = 1;\n	}\n\n	public void atama() {\n		ustYuz = (int) (Math.random() * MAX) + 1;\n	}\n\n	public void setUstYuzu(int ustYuz) {\n		if (ustYuz <= MAX && ustYuz > 0)\n			this.ustYuz = ustYuz;\n	}\n\n	public int getUstYuzu() {\n		return ustYuz;\n	}\n\n	public String toString() {\n		String sonuc = Integer.toString(ustYuz);\n		return sonuc;\n	}\n}`,
      },
      {
        type: 0,
        content: `### Main Metodu\n\nYukarıdaki sınıfı main metodunda kullanmak için bu şekilde kod yazabiliriz.`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main(String[] args) {\n		zar zar1, zar2; // zar sınıfınran 2 nesne türettik\n		int toplam; // toplam zarların üst yüzünü saklamak için\n		zar1 = new zar(); // bizinci zarı tanımladık\n		zar2 = new zar(); // ikinci zarı tanımladık\n		zar1.atama(); // birinci zarı attık\n		zar2.atama(); // ikinci zarı attık\n		System.out.println("Zar Bir: " + zar1 + ", Zar İki: " + zar2); // toString() metodundan yararlanarak onları yazdırabiliriz\n		zar1.atama(); // birinci zarı tekrar attık\n		zar2.setUstYuzu(4); // ikinci zarı elimiz ile üst yüzü 4 yaptık\n		System.out.println("Zar Bir: " + zar1 + ", Zar İki: " + zar2); // toString() metodundan yararlanarak onları yazdırabiliriz\n		toplam = zar1.getUstYuzu() + zar2.getUstYuzu(); // get metodundan yararlanarak iki zarın üst yüzleri toplayabildik\n		System.out.println("Toplam: " + toplam); // toplamı yazdırabiliriz\n		zar2.setUstYuzu(7); // setUstYuzu() metodunda yazdığımız kısıtlama dolayından 7 değeri atanamayacak ve 4 kalacaktır\n		System.out.println("zar İki: " + zar2);\n}`,
      },
      {
        type: 0,
        content: `### Kodun Tamamı\n\nhem main metodu hem zar sınıfı tamamen kod bu şekilde olacaktır`,
      },
      {
        type: 2,
        language: "java",
        code: `public class ornek{\n\n	public static void main(String[] args) {\n		zar zar1, zar2; // zar sınıfınran 2 nesne türettik\n        int toplam; // toplam zarların üst yüzünü saklamak için\n        zar1 = new zar(); // bizinci zarı tanımladık\n        zar2 = new zar(); // ikinci zarı tanımladık\n        zar1.atama(); // birinci zarı attık\n        zar2.atama(); // ikinci zarı attık\n        System.out.println("Zar Bir: " + zar1 + ", Zar İki: " + zar2); // toString() metodundan yararlanarak onları yazdırabiliriz\n        zar1.atama(); // birinci zarı tekrar attık\n        zar2.setUstYuzu(4); // ikinci zarı elimiz ile üst yüzü 4 yaptık\n        System.out.println("Zar Bir: " + zar1 + ", Zar İki: " + zar2); // toString() metodundan yararlanarak onları yazdırabiliriz\n        toplam = zar1.getUstYuzu() + zar2.getUstYuzu(); // get metodundan yararlanarak iki zarın üst yüzleri toplayabildik\n        System.out.println("Toplam: " + toplam); // toplamı yazdırabiliriz\n        zar2.setUstYuzu(7); // setUstYuzu() metodunda yazdığımız kısıtlama dolayından 7 değeri atanamayacak ve 4 kalacaktır\n        System.out.println("zar İki: " + zar2); // 4 olarak göreceğiz\n	}\n}\n\nclass zar {\n	private final int MAX = 6;\n	private int ustYuz;\n\n	public zar() {\n		ustYuz = 1;\n	}\n\n	public void atama() {\n		ustYuz = (int) (Math.random() * MAX) + 1;\n	}\n\n	public void setUstYuzu(int ustYuz) {\n		if (ustYuz <= MAX && ustYuz > 0)\n			this.ustYuz = ustYuz;\n	}\n\n	public int getUstYuzu() {\n		return ustYuz;\n	}\n\n	public String toString() {\n		String sonuc = Integer.toString(ustYuz);\n		return sonuc;\n	}\n}`,
      },
      {
        type: 0,
        content: `## Sorular\n\n### Bir sınıf ile bir nesne arasındaki ilişki nedir?\n\nBir sınıf bir nesnenin tanımı, şablonu veya mavzolugudur. Bir nesne tarafından yönetilecek verileri tanımlar, ancak bunun için bellek alanı ayırmaz. Bir sınıftan birden çok nesne oluşturulabilir ve her bir nesnenin kendi örneğine ait veri kopyası vardır.\n\n### Özellikler nerede tanımlanır?\n\nÖzellikler: değişkenler ve metotlar Sınıf seviyesinde tanımlanır.\n\n### Yerel değişken nedir?\n\nYerel veri, bir metot içinde tanımlanır ve sadece o metotte erişilebilir.\n\n### **Neden \`ustYuz\` değişkeni \`private\` olarak tanımlandı?**\n\n\`ustYuz\` değişkenini \`private\` yapmamızın nedeni, sadece sınıfın sağladığı belirli metodlar aracılığıyla değiştirilmesine olanak tanımaktır. Bu şekilde, sınıfın içindeki belirlediğimiz kısıtlamalara uygun değerler atanabilir. Ancak, belirlenen kısıtlamaları sağlamayan bir değer atanmaya çalışırsa, bu atanma işlemi gerçekleştirilmez.\n\n### Neden \`MAX\` değişkeni sabit olarak tanımlandı?\n\nKapsülleme ihlal edilmemesi için \`MAX\` sabit bir değer olarak atanır; ayrıca, zarın en yüksek değeri 6'dır.`,
      },
      {
        type: 0,
        heading: "Kapsülleme",
        content: `Bir nesnenin iç detaylarının istemciye gizlenmesini sağlayan bir programlama prensibidir.\n\nBir siyah kutu gibi düşünebilirsiniz. İstemci, sadece nesnenin arayüz metotlarını çağırır ve bu metotlar, nesnenin iç verilerini yönetir. İstemcinin nesnenin iç yapısı hakkında hiçbir bilgisi olmaz, sadece nesnenin sağladığı hizmetlere erişir.\n\n### **Üç Temel Görünürlük Belirteci**:\n\n- **\`public\`**: Tüm sınıflardan ve paketlerden erişilebilir ( her yerden ).\n- **\`private\`:**  Sadece tanımlandığı sınıf içerisinden erişilebilir.\n- \`protected\`: Aynı paket içerisinden ve alt sınıflardan (inheritance) erişilebilir.\n\n**Eğer herhangi bir erişim belirteci belirtilmezse (yani belirteç belirtilmezse), bu durumda öğe \`*default (package-private)*\` olarak kabul edilir. Bu durumda, sadece aynı paketten erişim mümkündür. Erişim belirtecinin açıkça belirtilmediği durumlarda kullanılır.**\n\n- Sabitler **\`public\`** olarak tanımlanabilir, ancak değişkenlerin **\`public\`** olarak tanımlanması önerilmez.\n\n## **Getter ve Setter**\n\n- Erişimci metodlar \`getter\` olarak adlandırılır.\n- Mutatör metodlar \`setter\` olarak adlandırılır.`,
      },
      {
        type: 3,
        quote: "Bu metodlar, kapsülleme ilkesini korurken, sınıf dışından özel verilere güvenli bir şekilde erişim ve bu verilerin değiştirilmesini sağlar.",
      },
      {
        type: 0,
        content: `### Otomatik Olarak Getter ve Setter Oluşturma\n\nBöyle **\`x\`** ve **\`y\`** alanlarına sahip bir sınıfımız olsun:`,
      },
      {
        type: 2,
        language: "java",
        code: `class ClassName {\n	private int x, y;\n}`,
      },
      {
        type: 0,
        content: `Onun **\`getter\`** ve **\`setter\`** metotlarını yazmak istersek, bunları **\`Eclipse\`** ayarlarından **otomatik** olarak oluşturabiliriz.`,
      },
      {
        type: 1,
        imageUrl: "https://github.com/yasir723/java/assets/111686779/7ad5641a-39de-464e-9a8f-bf819987206f",
        caption:  "Generate Getters and Setters - Adım 1",
      },
      {
        type: 0,
        content: `Mouse ile sağ tıklayıp **\`source\`** -> **\`Generate Getters and Setters …\`** seçeneğini seçtikten sonra bu pencere gösterilecektir:`,
      },
      {
        type: 1,
        imageUrl: "https://github.com/yasir723/java/assets/111686779/a72e2baa-57e0-4a64-a6ce-e636d3c81e32",
        caption:  "Generate Getters and Setters - Adım 2",
      },
      {
        type: 0,
        content: `Bu pencerede hangi değişkenler için **\`getter\`** ve **\`setter\`** metotlarını oluşturmak istediğimizi işaretleriz. Ardından \`Genrate\` buttonuna tıklayarak oluşturmuş oluruz.\n\n### Otomatik Olarak Constructor Oluşturma\n\nBir sınıf için **\`Eclipse\`** ayarlarından **otomatik** olarak constructor oluşturabiliriz.`,
      },
      {
        type: 1,
        imageUrl: "https://github.com/yasir723/java/assets/111686779/e0e5f881-00b3-436f-8105-0cd7364c8864",
        caption:  "Generate Constructor using Fields - Adım 1",
      },
      {
        type: 0,
        content: `Mouse ile sağ tıklayıp **\`source\`** -> \`Generate Constructor using Fields …\` seçeneğini seçtikten sonra bu pencere gösterilecektir:`,
      },
      {
        type: 1,
        imageUrl: "https://github.com/yasir723/java/assets/111686779/e78fee24-3c1e-46b6-bdc6-d1b1f90c8fd9",
        caption:  "Generate Constructor using Fields - Adım 2",
      },
      {
        type: 0,
        content: `Bu pencerede, constructor içinde parametre olarak alınmasını istediğimiz değişkenleri işaretleriz. Ardından \`Genrate\` buttonuna tıklayarak oluşturmuş oluruz.`,
      },
      {
        type: 0,
        heading: "Yazılım Geliştiricisinin Yapması Gereken Faaliyetler",
        content: `## Program geliştirmenin dört temel faaliyeti\n\n- Gereksinimleri Belirleme\n- Tasarım Oluşturma\n- Kodları Uygulama\n- Uygulamanın Test Edilmesi\n\n- **Gereksinimler:**\n    - Yazılım gereksinimleri, bir programın gerçekleştirmesi gereken görevleri belirler.\n    - Gereksinimler, ne yapılacağını, nasıl yapılacağını değil belirtir.\n    - Genellikle başlangıçta bir gereksinim kümesi sağlanır, ancak bunlar eleştirilmeli ve genişletilmelidir.\n    - Detaylı, belirsizliği olmayan ve eksiksiz gereksinimler belirlemek zor olabilir.\n    - Gereksinimlere dikkatli bir şekilde dikkat etmek, genel proje sürecinde önemli zaman ve maliyet tasarrufu sağlayabilir.\n    \n- **Uygulama**:\n    - Uygulama, bir tasarımın kaynak kodlara çevrilme sürecidir.\n    - Acemi programcılar genellikle kod yazmanın yazılım geliştirmenin özü olduğunu düşünürler, ancak aslında bu en az yaratıcı adım olmalıdır.\n    - Hemen hemen tüm önemli kararlar gereksinimler ve tasarım aşamalarında alınır.\n    - Uygulama, kodlama detaylarına, stil kılavuzlarına ve belgelendirmeye odaklanmalıdır.\n\n- **Tasarım**:\n    - Yazılım tasarımı, bir programın gereksinimlerini nasıl gerçekleştireceğini belirtir.\n    - Bir yazılım tasarımı, çözümün nasıl yönetilebilir parçalara ayrılabileceğini ve her parçanın ne yapacağını belirtir.\n    - Nesne yönelimli bir tasarım, hangi sınıfların ve nesnelerin gereksinim duyulduğunu belirler ve bunların nasıl etkileşimde bulunacaklarını belirtir.\n    - Düşük seviyeli tasarım detayları, bireysel metotların görevlerini nasıl gerçekleştireceğini içerir.\n    \n- **Test Etme**:\n    - Test etme, programın gereksinimlerde belirtilen tüm kısıtlar altında amaçlanan sorunu çözeceğinden emin olmaya çalışır.\n    - Bir program hataları bulma amacıyla titizlikle test edilmelidir.\n    - Hata ayıklama, bir sorunun nedenini belirleme ve düzeltme sürecidir.\n    \n\n## **Sınıflar ve Nesneleri Belirleme**\n\nNesne yönelimli tasarımın temel etkinliği, çözümü oluşturacak sınıfları ve nesneleri belirlemektir. Sınıflar genellikle bir sınıf kitabından (class library) gelir, önceki bir projeden yeniden kullanılır veya yeni yazılır. Potansiyel sınıfları belirlemenin bir yolu, gereksinimlerde tartışılan nesneleri belirlemektir. Nesneler genellikle isimlerdir ve bir nesnenin sağladığı hizmetler genellikle fiillerdir.\n\n### Örnek Bir Vaka Çalışması\n\n- Bir öğrenci dört ders alabilir. Öğrencinin adı, soyadı, kimlik numarası ve adres bilgileri bulunmaktadır. Öğrenci, bir kurs hakkında arkadaşlarına bilgi verebilir.\n- Öğrencinin üç başka öğrenci arkadaşı olabilir. Öğrenci, notları hakkında bilgi verebilir.\n- Öğretmen, 20 öğrenciye ders verir. Sınıfındaki öğrencilere not verir.\n\n---\n\n## Bilgiler\n\n- Bir sınıfın, aynı davranışlara sahip nesnelerin bir grubunu temsil ettiğini hatırlayın.\n- Genellikle, nesneleri temsil eden sınıflara tekil isimler verilmelidir.\n- Örnekler: Para, Öğrenci, Mesaj\n- Bir sınıf, bir tane böyle bir nesnenin kavramını temsil eder.\n- İhtiyaca göre her nesnenin istediğimiz kadar örneğini oluşturabiliriz.\n\n---\n\n- Bazı durumlarda, bir şeyin bir sınıf olarak temsil edilip edilmeyeceğine karar vermek zor olabilir.\n- Örneğin, bir çalışanın adresi, bir dizi örnek değişkeni olarak mı yoksa bir Adres nesnesi olarak mı temsil edilmelidir?\n- Problemi ve detaylarını ne kadar inceleyip analiz ederseniz, bu konular o kadar açık hale gelir.\n- Bir sınıf çok karmaşık hale geldiğinde, genellikle sorumlulukları dağıtmak için birden fazla daha küçük sınıfa parçalanmalıdır.\n\n---\n\n- Doğru düzeyde ayrıntıya sahip sınıflar tanımlamak istiyoruz.\n- Örneğin, bir evdeki her tür cihaz için ayrı sınıflar oluşturmak gereksiz olabilir.\n- Daha genel bir Cihaz sınıfı tanımlamak, uygun örnek verileriyle yeterli olabilir.\n- Her şey çözülen problemle ilgili detaylara bağlıdır.\n\n---\n\n- İhtiyaç duyduğumuz sınıfları belirlemenin bir parçası, her bir sınıfa sorumluluk atama sürecidir.\n- Bir programın gerçekleştirmesi gereken her etkinlik, bir veya daha fazla yöntemle bir veya daha fazla sınıf tarafından temsil edilmelidir.\n- Genellikle yöntemlerin isimlerinde fiiller kullanırız.\n- Erken aşamalarda her sınıfın her yöntemini belirlemek gerekli değildir - ana sorumluluklarla başlayın ve tasarımı geliştirin.`,
      },
      {
        type: 0,
        heading: "Static Değişkenler ve Metotlar",
        content: `Static metotlar veya değişkenler sınıftan bir nesne türetmeden çağrılabilir. Sınıfın ismini kullanarak onlara erişilebilir.\n\nHepimiz \`Math\` sınıfını kullanmışızdır. onun içerdiği metotlara göz atarsak:\n\n1. **\`abs(x)\`**: Bir sayının mutlak değerini döndürür.\n2. **\`sqrt(x)\`**: Bir sayının karekökünü döndürür.\n3. **\`pow(x, y)\`**: Bir sayının belirli bir üs kuvvetini hesaplar.\n4. **\`sin(x)\`**, **\`cos(x)\`**, **\`tan(x)\`**: Bir açının sinüs, kosinüs ve tanjant değerlerini döndürür.\n5. **\`max(x, y)\`**, **\`min(x, y)\`**: İki sayıdan büyük veya küçük olanı döndürür.\n6. **\`ceil(x)\`**, **\`floor(x)\`**: Bir ondalıklı sayıyı yukarı veya aşağı yuvarlar.\n7. **\`random()\`**: 0 ile 1 arasında rastgele bir ondalıklı sayı üretir.\n\nAncak onları kullanırken \`Math math = new Math()\` diye bir satır **yazmıyoruz**. Hemen Bu şekilde kullanabiliriz.`,
      },
      {
        type: 2,
        language: "java",
        code: `result = Math.sqrt(25); // output: 5`,
      },
      {
        type: 3,
        quote: "Sınıf içinde bir değişken tanımladığımızda ve bu sınıftan birden fazla nesne türettiğimizde, genellikle her nesne için ayrı bir değişken oluşur ve her nesne için farklı olabilir. Ancak, statik değişkenler tüm nesneler için aynıdır ve bir statik değişkenin değeri herhangi bir nesnede değiştirildiğinde, diğer tüm nesnelerde de değişir. Statik bir değişkenin bellek alanı, sınıf ilk kez referans alındığında oluşturulur.",
      },
      {
        type: 0,
        content: `## Tanımlama\n\nStatik değişkenler bu şekilde tanımlanabilir:`,
      },
      {
        type: 2,
        language: "java",
        code: `private static float price;`,
      },
      {
        type: 0,
        content: `Statik metotlar bu şekilde tanımlanabilir:`,
      },
      {
        type: 2,
        language: "java",
        code: `public class Helper {\n	public static int cube(int num) {\n		return num * num * num;\n	}\n}`,
      },
      {
        type: 0,
        content: `ve onu kullanmak istediğimizde kullanım şekli böyledir:`,
      },
      {
        type: 2,
        language: "java",
        code: `value = Helper.cube(4); // output: 64`,
      },
      {
        type: 3,
        quote: "`araba` diye bir sınıfımız olsun, içinde `sahip` değişkeni, `hareket()` metodu olsun",
      },
      {
        type: 2,
        language: "java",
        code: `class araba{\n	private String sahip;\n	public static void hareket() {\n		System.out.println(sahip);\n	}\n}`,
      },
      {
        type: 0,
        content: `\`sahip\` değişkeni normal bir değişken olduğu için her nesne için farklı değerler alabilmişken \`hareket\` metodu tüm nesneler için aynıdır ve bir nesneye bağlı olmadan doğrudan sınıf adıyla çağrılır.  Dolayısıyla, \`hareket\` metodu içinde hangi nesnenin sahip değişkenine erişeceğini belirlemek mümkün değildir, bu da hata ile sonuçlanır.\n\n## Static Değişkenleri ve Metotları Kullanımı\n\nslogan diye bir sınıfımız olsun, bu sınıftan kaç nesne türetildiğini hesaplamak istiyorum, işte hesaplamak için statik değişkenleri kullanmam gerek:\n\n**Slogan Sınıfı:**`,
      },
      {
        type: 2,
        language: "java",
        code: `class Slogan {\n	private String ifade;\n	private static int adet = 0;\n\n	//----------------------------------------------------------------\n	// Yapılandırıcı: Sloganı ayarlar ve oluşturulan örneklerin sayısını sayar.\n	//----------------------------------------------------------------\n	public Slogan(String str) {\n		ifade = str;\n		adet++;\n	}\n\n	//----------------------------------------------------------------\n	// Bu sloganı bir dize olarak döndürür.\n	//----------------------------------------------------------------\n	public String toString() {\n		return ifade;\n	}\n\n	//----------------------------------------------------------------\n	// Bu sınıfın oluşturulan örneklerinin sayısını döndürür.\n	//----------------------------------------------------------------\n	public static int getAdet() {\n		return adet;\n	}\n}`,
      },
      {
        type: 0,
        content: `Main Metodu:`,
      },
      {
        type: 2,
        language: "java",
        code: `	public static void main(String[] args) {\n	\n		Slogan slogan1 = new Slogan("Hello World");\n		Slogan slogan2 = new Slogan("Merhaba Dunya");\n		\n		System.out.println(slogan1); // Hello World\n		System.out.println(Slogan.getAdet()); // 2\n		Slogan slogan3;\n		System.out.println(Slogan.getAdet()); // 2\n	}`,
      },
      {
        type: 0,
        content: `fark edersek \`getAdet()\` metodunu çağırdığımızda nesne adıyla değil sınıf adıyla çağırdık.`,
      },
      {
        type: 0,
        heading: "Class Relationships (Sınıf ilişkileri)",
        content: `Bir yazılım sistemindeki sınıflar, birbirlerine çeşitli ilişki türlerine sahip olabilirler.\n\n## Java'da en yaygın üç ilişki türü\n\n- **Dependency(Bağımlılık)**: A uses B\n- **Aggregation(Birleşim)**: A has-a B\n- I**nheritance(Kalıtım)**: A is-a B\n\n## ⚪ **Dependency Nedir?**\n\nbir sınıfın diğer bir sınıfa, genellikle onun metotlarını çağırarak, bir şekilde bağımlı olduğu durumdur. Bu ilişki, yazılım tasarımında yaygın olarak karşılaşılan bir durumdur. İyi bir tasarım, gereksiz karmaşıklığı önlerken doğru bağımlılıkları korur. Ayrıca, bazı durumlarda bir sınıf kendi içindeki nesneler arasında da bağımlılık gösterebilir. Bu durumda, sınıfın bir metodu, aynı sınıfın başka bir nesnesini parametre olarak kabul edebilir.\n\n### Örnek\n\nBir kesirli sayı düşünelim, onu başka kesirli bir sayı ile toplayabiliriz veya çarpabiliriz gibi dört işlem, aynı zamanda bir kesirli sayıyı sadeleştirebiliriz. tersini alabiliriz.\n\nKesirli sayıyı temsil eden bir sınıf oluşturalım ve kesirli bir sayı üzerinde yapılan tüm işlemleri gerçekleştirelim.\n\nAyrıca sınıfı oluştururken \`Bağımlılık\` ilişkisini kullanarak daha performanslı bir şekilde oluşturalım.\n\n**Tanımlama:**\n\nİlk önce herhangi kesirli bir sayı iki temel özelliği var oda \`pay\` ve \`payda\` , onu tanımlama ile başlayalım.`,
      },
      {
        type: 2,
        language: "java",
        code: `class KesirSayi {\n	private int pay, payda;\n}`,
      },
      {
        type: 0,
        content: `**Constructor ( Yapılandırıcı ) Metodu:**\n\nBir kesirli sayı oluştururken, kesrin pay ve paydasını belirtmek zorundayız ki kesirli bir sayı elde edelim. Bu değerleri sınıfı ilk oluşturduğumuz anda almalıyız. Ayrıca, payda değerinin 0 olamayacağını kontrol etmeliyiz.`,
      },
      {
        type: 2,
        language: "java",
        code: `public KesirSayi(int pay, int payda) {\n	if (payda == 0)\n		payda = 1;\n\n	if (payda < 0) {\n		pay = pay * -1;\n		payda = payda * -1;\n	}\n\n	this.pay = pay;\n	this.payda = payda;\n\n	sadelestir();\n}`,
      },
      {
        type: 0,
        content: `\`sadelestir()\` metodu kesirli bir sayı ilk oluşturulduğunda en sade halinin üzerinde işlem yapmayı sağlar. Başka bir metot yapılandırıcı metodun içinde kullanmak Bağımlılık prensibini kullanmış oldum ve işlemi tekrar yapmak yerine sadece bu metodu çağırarak performansı yükseltmiş olduk.\n\n**Sadeleştir:**\n\nBir kesrin sadeleştirilmesi, \`pay\` ve \`payda\` arasındaki en büyük ortak böleni bulup her ikisinin de bu değere bölünmesiyle gerçekleşir, böylece kesir en basit hâline getirilir.\n\nİki sayının arasında en büyük ortak böleni (\`ebob\`) bulmak için bu metodu kullanacağız:`,
      },
      {
        type: 2,
        language: "java",
        code: `private int ebob(int sayi1, int sayi2) {\n	while (sayi2 != 0) {\n		int temp = sayi2;\n		sayi2 = sayi1 % sayi2;\n		sayi1 = temp;\n	}\n	return sayi1;\n}`,
      },
      {
        type: 0,
        content: `Bu algoritmaya \`Euclid\` algoritması denir.\n\nİşte pay ile payda arasındaki ebob bulduktan sonra sadece pay ve paydayı ortak bölen ile bölmemiz kalır.`,
      },
      {
        type: 2,
        language: "java",
        code: `	private void sadelestir() {\n		if (pay != 0) {\n			int ortak = ebob(Math.abs(pay), payda);\n			pay = pay / ortak;\n			payda = payda / ortak;\n		}\n	}`,
      },
      {
        type: 0,
        content: `pay sıfır olma durumunu maliyet açısından kontrol ettik, boşuna ebob metoduna gidip gereksiz işlem yapılmasın diye.\n\n**Kapsülleme:**\n\n\`Pay\` ve \`payda\` değerlerini sınıf içinde private olarak tanımladık, ancak bazı durumlarda bu değerlere erişmemiz gerekebilir. Bu nedenle, bu değerlere erişmek için bir erişimci metot (getter) tanımlamamız gerekir.`,
      },
      {
        type: 2,
        language: "java",
        code: `public int getPay() {\n	return pay;\n}`,
      },
      {
        type: 0,
        content: `\`Pay\` değerine erişmek için kullanılır.`,
      },
      {
        type: 2,
        language: "java",
        code: `public int getPayda() {\n	return payda;\n}`,
      },
      {
        type: 0,
        content: `\`Payda\` değerine erişmek için kullanılır.\n\n**Kesrin Tersi:**\n\nKesrin tersi, orijinal kesrin pay ve paydasının yer değiştirmesi anlamına gelmez mi ? Yani, pay paydaya, payda ise paya yazılır. Bu işlemi basitçe şu şekilde ifade edebiliriz.`,
      },
      {
        type: 2,
        language: "java",
        code: `public KesirSayi tersi() {\n	return new KesirSayi(payda, pay);\n}`,
      },
      {
        type: 0,
        content: `**Toplama İşlemi:**\n\nMatematik derslerinden bildiğimiz gibi iki kesrin toplanması bu şekilde olur\n\n$$ \n\\cfrac{pay1}{payda1} + \\cfrac{pay2}{payda2} = \\cfrac{pay1*payda2 + pay2*payda1}{payda1*payda2}\n$$\n\nİşte kod ile temsil edersek bu şekilde olur:`,
      },
      {
        type: 2,
        language: "java",
        code: `public KesirSayi topla(KesirSayi op2) {\n	int pay1 = pay * op2.getPayda() + op2.getPay() * payda;\n	int payda1 = payda * op2.getPayda();\n	return new KesirSayi(pay1, payda1);\n}`,
      },
      {
        type: 0,
        content: `Burada eğer daha önce getter metotlarını tanımlamadıysak gelen kesrin payına ve paydasına erişemeyecektik. Bu noktada da fark edersek \`Bağımlılık\` vardır.\n\n**Çıkarma İşlemi:**\n\nMatematik derslerinden bildiğimiz gibi iki kesrin çıkarılması bu şekilde olur\n\n$$ \n\\cfrac{pay1}{payda1} - \\cfrac{pay2}{payda2} = \\cfrac{pay1*payda2 - pay2*payda1}{payda1*payda2}\n$$\n\nFark edersek toplamı işlemi ile farkı sadece ikinci kesrin payı ters işaretli olması. Bu nedenle biz toplama metodunu kullanarak çıkarma işlemini gerçekleştirebiliriz.`,
      },
      {
        type: 2,
        language: "java",
        code: `public KesirSayi cikar(KesirSayi op2) {\n	KesirSayi k = new KesirSayi(op2.getPay() * -1, op2.getPayda());\n	return topla(k);\n}`,
      },
      {
        type: 0,
        content: `**Çarpma İşlemi:**\n\nMatematik derslerinden bildiğimiz gibi iki kesrin çarpılması bu şekilde olur\n\n$$ \n\\cfrac{pay1}{payda1} * \\cfrac{pay2}{payda2} = \\cfrac{pay1*pay2}{payda1*payda2}\n$$\n\nİşte kod ile temsil edersek bu şekilde olur:`,
      },
      {
        type: 2,
        language: "java",
        code: `public KesirSayi carp(KesirSayi op2) {\n	int pay = this.pay * op2.getPay();\n	int payda = this.payda * op2.getPayda();\n	return new KesirSayi(pay, payda);\n}`,
      },
      {
        type: 0,
        content: `**Bölme İşlemi:**\n\nMatematik derslerinden bildiğimiz gibi iki kesrin bölünmesi birinci kesri ikinci kesrin tersiyle çarpılmasıyla elde edilir.\n\n$$ \n\\cfrac{pay1}{payda1} ÷ \\cfrac{pay2}{payda2} = \\cfrac{pay1}{payda1} * \\cfrac{payda2}{pay2}\n$$\n\nVe benim tersi alan, çarpma işlemi yapan metotlarım var, onları kullanarak bölme işlemi yeni kodlar yazmadan gerçekleştirebilirim.`,
      },
      {
        type: 2,
        language: "java",
        code: `public KesirSayi bol(KesirSayi op2) {\n	return carp(op2.tersi());\n}`,
      },
      {
        type: 0,
        content: `**Karşılaştırma İşlemi:**\n\nİki kesrin eşit olup olmadığını öğrenmek için payların ve paydaların eşitliğini kontrol edeceğiz.`,
      },
      {
        type: 2,
        language: "java",
        code: `public boolean esitMi(KesirSayi op2) {\n	return (pay == op2.getPay() && payda == op2.getPayda());\n}`,
      },
      {
        type: 0,
        content: `Bir kesir için bir nesne ilk oluşturulduğunda sadeleştirdiğimiz için 9/12 = 3/4  sadeleştirilmemiş olsa da doğru sonuç verecektir.\n\n**toStirng Metodu:**\n\nBir kesir için oluşturulan nesneyi yazdırınca kesrin ne olduğunu yazdıran metottur`,
      },
      {
        type: 2,
        language: "java",
        code: `public String toString() {\n	String sonuc;\n	if (pay == 0)\n		sonuc = "0";\n	else if (payda == 1)\n		sonuc = pay + "";\n	else\n		sonuc = pay + "/" + payda;\n	return sonuc;\n}`,
      },
      {
        type: 0,
        content: `**KesirSayi Sınıfın Tam Kodu:**`,
      },
      {
        type: 2,
        language: "java",
        code: `class KesirSayi {\n	private int pay, payda;\n\n	public KesirSayi(int pay, int payda) {\n		if (payda == 0)\n			payda = 1;\n\n		if (payda < 0) {\n			pay = pay * -1;\n			payda = payda * -1;\n		}\n\n		this.pay = pay;\n		this.payda = payda;\n\n		sadelestir();\n	}\n\n	public int getPay() {\n		return pay;\n	}\n\n	public int getPayda() {\n		return payda;\n	}\n\n	public KesirSayi tersi() {\n		return new KesirSayi(payda, pay);\n	}\n\n	public KesirSayi topla(KesirSayi op2) {\n		int pay1 = pay * op2.getPayda() + op2.getPay() * payda;\n		int payda1 = payda * op2.getPayda();\n		return new KesirSayi(pay1, payda1);\n	}\n\n	public KesirSayi cikar(KesirSayi op2) {\n		KesirSayi k = new KesirSayi(op2.getPay() * -1, op2.getPayda());\n		return topla(k);\n	}\n\n	public KesirSayi carp(KesirSayi op2) {\n		int pay = this.pay * op2.getPay();\n		int payda = this.payda * op2.getPayda();\n		return new KesirSayi(pay, payda);\n	}\n\n	public KesirSayi bol(KesirSayi op2) {\n		return carp(op2.tersi());\n	}\n\n	public boolean esitMi(KesirSayi op2) {\n		return (pay == op2.getPay() && payda == op2.getPayda());\n	}\n\n	public String toString() {\n		String sonuc;\n		if (pay == 0)\n			sonuc = "0";\n		else if (payda == 1)\n			sonuc = pay + "";\n		else\n			sonuc = pay + "/" + payda;\n		return sonuc;\n	}\n\n	private void sadelestir() {\n		if (pay != 0) { \n			int ortak = ebob(Math.abs(pay), payda);\n			pay = pay / ortak;\n			payda = payda / ortak;\n		}\n	}\n\n	private int ebob(int sayi1, int sayi2) {\n		while (sayi2 != 0) {\n			int temp = sayi2;\n			sayi2 = sayi1 % sayi2;\n			sayi1 = temp;\n		}\n		return sayi1;\n	}\n}`,
      },
      {
        type: 0,
        content: `**Main Metodu:**`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main(String[] args) {\n		KesirSayi k1 = new KesirSayi(9, 12);\n		KesirSayi k2 = new KesirSayi(3, 4);\n		KesirSayi k3, k4, k5, k6, k7;\n\n		System.out.println("Birinci kesir: " + k1);\n		System.out.println("Ikinci kesir: " + k2);\n\n		k3 = k1.topla(k2);\n		k4 = k1.cikar(k2);\n		k5 = k1.carp(k2);\n		k6 = k1.bol(k2);\n		k7 = k1.tersi();\n\n		System.out.println("Toplam: " + k3);\n		System.out.println("Fark: " + k4);\n		System.out.println("Çarpım: " + k5);\n		System.out.println("Bölüm: " + k6);\n		System.out.println("Ters: " + k7);\n\n		System.out.println("K1 ve K2 " + (k1.esitMi(k2) ? "Eşittir" : "Eşit Değildir"));\n	}`,
      },
      {
        type: 0,
        content: `**Kodun Çıktısı:**`,
      },
      {
        type: 2,
        language: "text",
        code: `Birinci kesir: 3/4\nIkinci kesir: 3/4\nToplam: 3/2\nFark: 0\nÇarpım: 9/16\nBölüm: 1\nTers: 4/3\nK1 ve K2 Eşittir`,
      },
      {
        type: 0,
        heading: "## ⚪ **Aggregation Nedir?**",
        content: `Aggregation (Toplama veya Birleştirme) bir nesnenin diğer nesnelerden oluştuğu durumu ifade eder. Java'da, bu ilişki genellikle "has-a" (sahip olma) ilişkisi olarak adlandırılır. Yani bir nesne, diğer nesnelere sahip olabilir. İşte bazı örnekler:\n\n- Bir araba bir şasiye sahiptir.\n- Bir üniversite departmanlara sahiptir.\n- Bir departman eğitmenlere sahiptir.\n\n### **Aggregation'ın Özellikleri**\n\n1. **İlişki Türü**: Aggregation, iki nesne arasındaki bir tür bağımlılık ilişkisidir. Bir nesne diğerine bağımlıdır ve onu kullanarak işlevlerini yerine getirir.\n2. **Instance Verileri**: Birleştirilmiş bir nesne, başka nesnelere referanslar içerir. Bu referanslar, bir nesnenin diğer nesneleri içermesini sağlar.\n3. **Bağımlılık İlişkisi**: Aggregation, bir tür bağımlılık ilişkisidir. Birleştirilmiş nesne, içindeki diğer nesnelere bağımlıdır ve onların varlığına ihtiyaç duyar.\n\n### **Java'da Aggregation**\n\nAggregation, Java'da nesne kompozisyonu yoluyla gerçekleştirilir. Bu, bir sınıfın başka sınıflardan nesneleri instance verileri olarak içermesi anlamına gelir. İşte bu kavramı daha iyi anlamak için bir örnek:\n\n### **Örnek Kod**`,
      },
      {
        type: 2,
        language: "java",
        code: `class Kasa {\n    private Motor motor;\n    private Sanziman sanziman;\n    \n    public Kasa(Motor motor, Sanziman sanziman) {\n        this.motor = motor;\n        this.sanziman = sanziman;\n    }\n\n    // Diğer metotlar\n}\n\nclass Motor {\n    // Motor özellikleri ve metotları\n}\n\nclass Sanziman {\n    // Şanzıman özellikleri ve metotları\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Motor motor = new Motor();\n        Sanziman sanziman = new Sanziman();\n        Kasa araba = new Kasa(motor, sanziman);\n        \n        // Kasa nesnesi, Motor ve Sanziman nesnelerine sahiptir\n    }\n}`,
      },
      {
        type: 0,
        content: `Bu örnekte, **\`Kasa\`** sınıfı, **\`Motor\`** ve **\`Sanziman\`** nesnelerine sahiptir. Bu, bir arabanın motor ve şanzıman parçalarına sahip olduğu bir durumu temsil eder. Bu sayede, **\`Kasa\`** sınıfı, **\`Motor\`** ve **\`Sanziman\`** sınıflarına bağımlı hale gelir ve onları kullanarak işlevlerini yerine getirir.`,
      },
      {
        type: 3,
        quote: "Aggregation, yazılım tasarımında nesneler arasındaki ilişkileri daha etkili ve verimli bir şekilde modellemek için güçlü bir tekniktir. Bu ilişki türü, yazılımın esnekliğini ve genişletilebilirliğini artırır.",
      },
      {
        type: 0,
        content: `### **Aggregation Örneği: Öğrenci ve Adres Nesneleri**\n\n**Aggregation** (Toplama veya Birleştirme) ilişkisi, bir nesnenin diğer nesnelerden oluştuğu durumu ifade eder. Aşağıda, bir Öğrenci nesnesinin Adres nesnelerinden oluştuğu bir örnek verilmektedir. Her öğrenci, iki adet adres bilgisine sahip olabilir: biri ev adresi, diğeri ise okul adresi.`,
      },
      {
        type: 2,
        language: "java",
        code: `class Student {\n	private String isim;\n	private String soyisim;\n	private Address evAdresi;\n	private Address okulAdresi;\n\n	public Student(String isim, String soyisim, Address evAdresi, Address okulAdresi) {\n		this.isim = isim;\n		this.soyisim = soyisim;\n		this.evAdresi = evAdresi;\n		this.okulAdresi = okulAdresi;\n	}\n\n	public String toString() {\n		return isim + " " + soyisim + "\\nEv Adresi: " + evAdresi + "\\nOkul Adresi: " + okulAdresi;\n	}\n}`,
      },
      {
        type: 2,
        language: "java",
        code: `class Address {\n	private String cadde;\n	private String sehir;\n	private String ilce;\n	private long postaKodu;\n\n	public Address(String cadde, String sehir, String ilce, long postaKodu) {\n		this.cadde = cadde;\n		this.sehir = sehir;\n		this.ilce = ilce;\n		this.postaKodu = postaKodu;\n	}\n\n	public String toString() {\n		return sehir + ", " + ilce + ", " + cadde + ", " + postaKodu;\n	}\n}`,
      },
      {
        type: 2,
        language: "java",
        code: `public class StudentBody {\n	public static void main(String[] args) {\n		Address evAdresi = new Address("Yıldırım", "Kırıkkale", "Merkez", 12345);\n		Address okulAdresi = new Address("Ana Yol", "Kırıkkale", "Yahişhan", 12345);\n\n		Student ogrenci = new Student("Yasir", "Alrawi", evAdresi, okulAdresi);\n\n		System.out.println(ogrenci);\n	}\n}`,
      },
      {
        type: 0,
        content: `### UML Diyagramını :`,
      },
      {
        type: 2,
        language: "mermaid",
        code: `classDiagram\nStudent <-- StudentBody\nStudent *-- Address \nStudentBody: + main (args  String[]) void\nStudent : - String isim\nStudent : - String soyisim\nStudent : - Address evAdresi\nStudent : - Address okulAdresi\nStudent : + toString()\nAddress : - String sehir\nAddress : - String ilce\nAddress : - String cadde\nAddress : - long postaKodu\nAddress : + toString()`,
      },
      {
        type: 0,
        content: `### **\`this\` Referansı**\n- **\`this\`** referansı bir nesnenin kendisine referans vermesini sağlar.\n- Yani, bir metodun içinde kullanılan **\`this\`** referansı, metodun hangi nesne üzerinden çalıştırıldığını belirtir.`,
      },
      {
        type: 2,
        language: "java",
        code: `public Account(String name, long acctNumber, double balance)\n{\n  this.name = name;\n  this.acctNumber = acctNumber;\n  this.balance = balance;\n}`,
      },
      {
        type: 0,
        heading: "🟡 Inheritance (Kalıtım)",
        content: `Kalıtım, nesne yönelimli programlamanın temel bir prensibidir. Bu prensibe göre, bir sınıf, diğer bir sınıfın özelliklerini ve davranışlarını miras alabilir. Bu durum, yazılım geliştirme sürecinde kodun yeniden kullanılabilirliğini artırır ve programların daha düzenli ve anlaşılır olmasını sağlar.`,
      },
      {
        type: 3,
        quote: "Ancak gereksiz yerlerde kullanılması performansı olumsuz etkiler.",
      },
      {
        type: 0,
        content: `### Temel Kavramları\n- **Kalıtım**, bir yazılım geliştiricisinin mevcut bir sınıftan yeni bir sınıf türetmesine olanak tanır.\n- Mevcut sınıfa **ebeveyn sınıf**, **üst sınıf** veya **temel sınıf** denir.\n- Türetilmiş sınıfa ise **çocuk sınıf** veya **alt sınıf** denir.\n- Yani, **çocuk sınıf**, **ebeveyn sınıf** tarafından tanımlanan metotları ve verileri miras alır.`,
      },
      {
        type: 2,
        language: "mermaid",
        code: `classDiagram\nCalisan <|-- Gelistirici \nCalisan <|-- Muhasebeci \nCalisan <|-- Tedarikci \nCalisan : - String isim\nCalisan : - String ePosta\nCalisan : - String tel\nCalisan : - String bolum\nCalisan : - String adres\nCalisan : - String dogumTarihi\nCalisan : - String maas\nGelistirici : - String projeAdi\nMuhasebeci : - String GunlukStok\nTedarikci : - String sehir`,
      },
      {
        type: 3,
        quote: "Bir sınıf başka bir sınıftan miras alırsa değişkenleri, metotları ve iç içe sınıfları(nested classes) miras olarak almış olur.",
      },
      {
        type: 0,
        content: `### Kullanım Şekli\n\nJava'da bir sınıfı başka bir sınıftan türetmek için **\`extends\`** anahtar kelimesi kullanılır. Bu, yeni sınıfın mevcut bir sınıfın özelliklerini ve yöntemlerini miras almasını sağlar.`,
      },
      {
        type: 2,
        language: "java",
        code: `public class Araba extends Arac {\n    // Sınıf içeriği\n}`,
      },
      {
        type: 0,
        content: `### Örnek\nKelime diye bir sınıfın diyagramı bu şekilde olsun:`,
      },
      {
        type: 2,
        language: "mermaid",
        code: `classDiagram\nSozluk <-- Kelime\nKitap <|-- Sozluk \n\nKitap : # int sayfaSayisi\nKitap : + setSayfa() void\nKitap : + getSayfa() int\n\nKelime: +main(args String[]) void\n\nSozluk : - tanimlar int\nSozluk : + oranHesapla() double\nSozluk : + setTanim() void\nSozluk : + getTanim() int`,
      },
      {
        type: 2,
        language: "java",
        code: `class Kitap {\n	protected int sayfaSayisi = 1500;\n\n	public void setSayfa(int numSayfa) {\n		sayfaSayisi = numSayfa;\n	}\n\n	public int getSayfa() {\n		return sayfaSayisi;\n	}\n}`,
      },
      {
        type: 2,
        language: "java",
        code: `class Sozluk extends Kitap {\n	private int tanimlar = 52500;\n\n	public double oranHesapla() {\n		return (double) tanimlar / sayfaSayisi;\n	}\n\n	public void setTanim(int numTanimlar) {\n		tanimlar = numTanimlar;\n	}\n\n	public int getTanim() {\n		return tanimlar;\n	}\n}`,
      },
      {
        type: 2,
        language: "java",
        code: `public class Kelime {\n\n	public static void main(String[] args) {\n		Sozluk webster = new Sozluk();\n		System.out.println("Sayfa sayisi: " + webster.getSayfa());\n		System.out.println("Tanim sayisi: " + webster.getTanim());\n		System.out.println("Sayfa basina tanim sayisi: " + webster.oranHesapla());\n	}\n}`,
      },
      {
        type: 0,
        content: `### Super() Metodu\nBir alt-sınıf, \`super()\` metodunu kullanarak, üst sınıfının bir nesnesini yaratabilir ve onun değişkenlerine değer atayabilir.`,
      },
      {
        type: 2,
        language: "java",
        code: `	public Sozluk(int sayfaSayisi, int tanimlar) {\n		super(sayfaSayisi);\n		this.tanimlar = tanimlar;\n	}`,
      },
      {
        type: 0,
        heading: "🟡 Polymorphism (Çok Biçimlilik)",
        content: `Polymorphism, nesne yönelimli programlamada, aynı işlemin farklı nesneler üzerinde farklı şekillerde gerçekleştirilebilmesini sağlayan bir kavramdır. \n\n## **Avantajları**\n- **Esneklik:** Kodunuzu daha esnek ve genişletilebilir hale getirir.\n- **Bakım Kolaylığı:** Farklı sınıflarda aynı metodu kullanarak kodun bakımını kolaylaştırır.\n- **Kod Tekrarını Azaltma:** Ortak bir arayüz veya üst sınıf kullanarak kod tekrarını azaltır.`,
      },
      {
        type: 0,
        content: `### Overloading (Aşırı Yükleme)`,
      },
      {
        type: 2,
        language: "java",
        code: `class Restoran {\n	public float siparis(float toplamFiyat) {\n		return toplamFiyat;\n	}\n\n	public float siparis(float toplamFiyat, float kargoUcreti) {\n		return toplamFiyat + kargoUcreti;\n	}\n\n	public float siparis(float toplamFiyat, float kargoUcreti, String kupon) {\n		float oran = getOranByKupon(kupon);\n		float indirim = toplamFiyat * oran;\n		return toplamFiyat + kargoUcreti - indirim;\n	}\n\n	private float getOranByKupon(String kupon) {\n		return 0.6f; \n	}\n}`,
      },
      {
        type: 0,
        content: `### Overriding (Geçersiz Kılma)`,
      },
      {
        type: 2,
        language: "mermaid",
        code: `classDiagram\nEmployee<|-- SalariedEmployee \nEmployee<|-- DailyEmployee\nEmployee<|-- HourlyEmployee\nEmployee : - String name\nEmployee : - String adress\nEmployee : - String department\nEmployee : - String email\nEmployee : - float salary\nEmployee : + getSalary()\nSalariedEmployee : - float bouns\nSalariedEmployee : + getBouns()\nSalariedEmployee : + getSalary()\nDailyEmployee : - float workDayPrice\nDailyEmployee : - int dailyRate\nDailyEmployee : + getSalary()\nHourlyEmployee : - float workDayPrice\nHourlyEmployee : - int hourlyRate\nHourlyEmployee : + getSalary()`,
      },
      {
        type: 2,
        language: "java",
        code: `class Employee {\n	private String name, department;\n	private float salary;\n\n	public Employee(String name, String department, float salary) {\n		this.name = name;\n		this.department = department;\n		this.salary = salary;\n	}\n\n	public float getSalary() {\n		return salary;\n	}\n}`,
      },
      {
        type: 2,
        language: "java",
        code: `class SalariedEmployee extends Employee {\n	private float bouns;\n\n	public SalariedEmployee(float bouns, String name, String department, float salary) {\n		super(name, department, salary);\n		this.bouns = bouns;\n	}\n	\n	public float getBouns() {\n		return bouns;\n	}\n\n	@Override\n	public float getSalary() {\n		return super.getSalary() + bouns;\n	}\n}`,
      },
      {
        type: 0,
        heading: "❤️‍🔥 Aggregation ve Composition",
        content: `**Aggregation**: Alt nesne bağımsız bir yaşam döngüsüne sahiptir. (Has-A ilişkisi)\n**Composition**: Alt nesne üst nesne ile aynı yaşam döngüsüne sahiptir. (Part-Of ilişkisi)`,
      },
      {
        type: 2,
        language: "mermaid",
        code: `classDiagram\nEmployee *-- PersonallInformation\nEmployee o-- Department\n\nEmployee: - int id\nEmployee: - float salary\nEmployee: - PersonallInformation personalInfo\nEmployee: - Department dept\n\nPersonallInformation: - firstName String\nPersonallInformation: - lastName String\nPersonallInformation: - accountNumber String\nPersonallInformation: - yearOdBirth int\nPersonallInformation: + PersonallInformation()\nPersonallInformation: + toString() String\n\nDepartment: - deptNo int\nDepartment: - deptName String\nDepartment: + Department()\nDepartment: + toString() String`,
      },
      {
        type: 2,
        language: "java",
        code: `class Employee {\n	private int id;\n	private float salary;\n	private PersonalInformation personalInfo; // Composition Relationship\n	private Department dept; // Aggregation Relationship\n\n	public Employee(int id, float salary, String firstName, String lastName, String accountNumber, int yearOfBirth,\n			Department dept) {\n		this.id = id;\n		this.salary = salary;\n		this.personalInfo = new PersonalInformation(firstName, lastName, accountNumber, yearOfBirth);\n		this.dept = dept;\n	}\n\n	@Override\n	public String toString() {\n		return "Employee[id=" + id + ", salary=" + salary + ", personalInfo=" + personalInfo + ", dept=" + dept + "]";\n	}\n}`,
      },
      {
        type: 3,
        quote: "Composition'da `PersonalInformation` sınıfını constructor içerisinde `new PersonalInformation()` olarak ürettiğimize dikkat edin. Bu sayede Employee silindiğinde PersonalInformation da silinir.",
      },
      {
        type: 0,
        heading: "🟡 Abstract Class (Soyut Sınıf)",
        content: `Bir **\`abstract\`** class, bir sınıf hiyerarşisinde genel bir kavramı temsil eden yer tutucu bir sınıftır. **"abstract"** anahtar kelimesi ile tanımlanan sınıflardır. Sınıfın içinde soyut **\`abstract\`** metotlar veya normal fonksiyonlar tanımlanabilir. Soyut sınıflardan **"new"** anahtar kelimesi ile bir nesne oluşturulamaz.`,
      },
      {
        type: 2,
        language: "java",
        code: `abstract class Car {\n	private float height ;\n	private float weight;\n	private int numberOfWheels;\n\n	public Car(float height, float weight, int numberOfWheels) {\n		this.height = height;\n		this.weight = weight;\n		this.numberOfWheels = numberOfWheels;\n	}\n\n	abstract void autoPilot();\n	abstract void streamingServices();\n	abstract void parkingSernsors();\n}`,
      },
      {
        type: 2,
        language: "java",
        code: `class SUV extends Car {\n	private String model;\n\n	public SUV(String model, float height, float weight, int numberOfWheels) {\n		super(height, weight, numberOfWheels);\n		this.model = model;\n	}\n\n	@Override\n	void autoPilot() {\n		System.out.println("SUV autoPilot");\n	}\n\n	@Override\n	void streamingServices() {\n		System.out.println("SUV streamingServices");\n	}\n\n	@Override\n	void parkingSernsors() {\n		System.out.println("SUV parkingSernsors");\n	}\n}`,
      },
      {
        type: 0,
        heading: "🟡 Interface (Arayüz)",
        content: `Java'da soyutlamayı gerçekleştirmenin bir diğer yolu **\`interface\`** tanımlamaktır. **\`interface\`**ler, abstract sınıflara kıyasla daha yüksek bir soyutlama düzeyine sahiptir. Bir sınıf birden fazla interface implement edebilir.`,
      },
      {
        type: 2,
        language: "mermaid",
        code: `classDiagram\nselfDrivable<|.. Car\nmovable <|.. Car\n<<interface>>selfDrivable\n<<interface>>movable\nCar : - x int\nCar : - y int\nCar : + getX() int\nCar : + setX(int) void\nCar : + getY() int\nCar : + setY(int) void\nCar : + Car()\nCar : + Car(int, int)\nselfDrivable : + destination(String) void\nselfDrivable : + drive() void\nmovable : + moveUp() void\nmovable : + moveDown() void\nmovable : + moveLeft() void\nmovable : + moveRight() void`,
      },
      {
        type: 2,
        language: "java",
        code: `interface selfDrivable {\n	void destination(String d); // string olarak lat ve lot bilgilerini alacaktır\n	void drive(); // araba hareket etmek için kullanılacaktır\n}\n\ninterface movable {\n	void moveUp(); // yukarıya hareket et\n	void moveDown(); // aşağı hareket et\n	void moveLeft(); // sola hareket et\n	void moveRight(); // sağa hareket et\n}`,
      },
      {
        type: 2,
        language: "java",
        code: `class Car implements movable, selfDrivable {\n	private int x, y;\n\n	public Car() {\n\n	}\n\n	public Car(int x, int y) {\n		this.x = x;\n		this.y = y;\n	}\n\n	@Override\n	public void moveUp() {\n		y--;\n	}\n\n	@Override\n	public void moveDown() {\n		y++;\n	}\n\n	@Override\n	public void moveLeft() {\n		x--;\n	}\n\n	@Override\n	public void moveRight() {\n		x++;\n	}\n\n	@Override\n	public void destination(String d) {\n		System.out.println("Destination = " + d);\n	}\n\n	@Override\n	public void drive() {\n		System.out.println("Drive");\n	}\n}`,
      },
      {
        type: 0,
        content: `Şimdi main metodunda kullanmaya başlayalım:`,
      },
      {
        type: 2,
        language: "java",
        code: `public static void main(String[] args) {\n	Car car = new Car();\n	car.destination("39.878805935007165,33.44799553728058");\n\n	selfDrivable sdCar = new Car();\n	((Car)sdCar).moveDown(); // Cast işlemi örneği\n}`,
      },
    ],
  },
];

export const blogCategories =[
  "all",
  "webDevelopment",
  "programming",
  "design",
  "aiMl",
  "career",
] as const;

export type BlogCategory = (typeof blogCategories)[number];