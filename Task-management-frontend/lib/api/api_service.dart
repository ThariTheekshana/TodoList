// api/api_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class APIServices {
  static const String baseUrl = 'http://localhost:5007/api/tasks';

  // Fetch all tasks
  static Future<List<dynamic>> fetchTasks() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load tasks');
    }
  }

  // Add a task
  static Future<void> addTask(String name, String description) async {
    final response = await http.post(Uri.parse(baseUrl),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'name': name,
          'description': description,
        }));
        if (response.statusCode != 201) {
      throw Exception('Failed to add task');
    }
  }

  // update a task
  static Future<void> updateTask(String id, String name, String description) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$id'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'name': name,
        'description': description,
      }),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to update task');
    }
  }

   // Delete a task
  static Future<void> deleteTask(String id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));
    if (response.statusCode != 200) {
      throw Exception('Failed to delete task');
    }
  }
}
