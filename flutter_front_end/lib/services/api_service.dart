import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/product.dart';

class ApiService {
  static const String allProductsUrl = 'https://api.npoint.io/a907f54f4d95e9e31711';
  static const String productDetailsUrl = 'https://api.npoint.io/7fe4c3d8d85298ece626';

  Future<List<Product>> fetchAllProducts() async {
    try {
      final response = await http.get(Uri.parse(allProductsUrl));
      if (response.statusCode == 200) {
        final List<dynamic> productsJson = json.decode(response.body);
        return productsJson.map((json) => Product.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load products: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Failed to load products: $e');
    }
  }

  Future<Product> fetchProductDetails(String id) async {
    try {
      final response = await http.get(Uri.parse(productDetailsUrl));
      if (response.statusCode == 200) {
        final Map<String, dynamic> productJson = json.decode(response.body);
        return Product.fromJson(productJson);
      } else {
        throw Exception('Failed to load product details: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Failed to load product details: $e');
    }
  }
}
