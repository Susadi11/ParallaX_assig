// models/product.dart
class Product {
  final String id;
  final String title;  // Changed from name
  final String description;
  final String images;  // Changed from imageUrl
  final double price;
  final double rating;

  Product({
    required this.id,
    required this.title,  // Changed from name
    required this.description,
    required this.images,  // Changed from imageUrl
    required this.price,
    required this.rating,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id']?.toString() ?? '',
      title: json['title']?.toString() ?? '',
      description: json['description']?.toString() ?? '',
      images: json['images']?.toString() ?? '',
      price: _parsePrice(json['price']?.toString() ?? '0.0'),
      rating: (json['rating'] is num) ? (json['rating'] as num).toDouble() : 0.0,
    );
  }

  // Helper method to parse price string like "$ 120.00"
  static double _parsePrice(String priceStr) {
    try {
      // Remove currency symbol and spaces, then parse
      final cleanPrice = priceStr.replaceAll(RegExp(r'[^\d.]'), '');
      return double.parse(cleanPrice);
    } catch (e) {
      return 0.0;
    }
  }
}