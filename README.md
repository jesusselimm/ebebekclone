# E-Bebek Ürün Carousel Projesi

Bu proje, e-bebek markası için bir ürün ve banner carousel'i içeren responsive web uygulamasıdır. Kullanıcılar ürünleri görüntüleyebilir, favorilere ekleyebilir ve detaylarını inceleyebilir.

## Özellikler

- Ürün ve Banner Carousel gösterimi
- Tamamen responsive tasarım
- Ürünleri favorilere ekleme ve yönetme
- İndirim hesaplama ve indirim yüzdesini gösterme
- Ürün yıldız değerlendirme sistemi
- Carousel navigasyonu (ok tuşları ile geçiş)
- Local Storage entegrasyonu ile favorileri kalıcı saklama
- Material Design ikonları entegrasyonu
- Dinamik ürün yükleme ve gösterme

## Teknik Yapı

- Tamamen JavaScript (ES6+) kullanılarak geliştirilmiştir
- Nesne Yönelimli Programlama (OOP) yaklaşımı kullanılmıştır
- ProductCarousel ve BannerCarousel sınıfları ile modüler yapı
- JavaScript ile dinamik olarak CSS ve HTML oluşturma
- Asenkron veri yükleme
- Modern JavaScript özellikleri (async/await, class, arrow functions)
- Local Storage API kullanımı
- DOM manipülasyonu ve event handling

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
```

2. `index.html` dosyasını bir web tarayıcısında açın veya bir local sunucu kullanarak çalıştırın.

## Kullanım

- Sayfayı açtığınızda ürün ve banner carousel'leri otomatik olarak yüklenir
- Carousel'leri kontrol etmek için sağ ve sol ok butonlarını kullanın
- Ürünleri favorilere eklemek için kalp ikonuna tıklayın
- Ürün detaylarını görüntülemek için ürün kartlarına tıklayın

## Gereksinimler

- Modern bir web tarayıcısı (Chrome, Firefox, Safari, Edge)
- JavaScript desteği
- İnternet bağlantısı (Material Icons fontları için)

## Geliştirme

Projeyi geliştirmek veya değiştirmek için:

1. `script.js` dosyasındaki `ProductCarousel` ve `BannerCarousel` sınıflarını düzenleyin
2. Yeni özellikler eklemek için ilgili sınıflara metotlar ekleyin
3. Tasarımı özelleştirmek için `createStyles()` metodunu düzenleyin 