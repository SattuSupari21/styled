from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import numpy as np

app = Flask(__name__)
CORS(app)

# Assuming your data is in a CSV file named 'your_dataset.csv'
dataset = pd.read_csv('products.csv')

# Combine multiple features into a single 'combined_features' column
dataset['combined_features'] = dataset[['Description', 'Individual_category']].fillna('').agg(' '.join, axis=1)

# Features to consider for recommendation
features = dataset['combined_features']

# Create a mapping between 'Product_id' and its index
product_id_to_index = {product_id: index for index, product_id in enumerate(dataset['Product_id'])}

# TF-IDF Vectorization
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(features)

# Calculate item-item similarity using cosine similarity
item_similarity = linear_kernel(tfidf_matrix, tfidf_matrix)

# Function to get content-based recommendations for a given product
def get_content_based_recommendations(product_id, item_similarity=item_similarity, N=10):
    # Get the index of the specified product_id)
    product_index = product_id_to_index.get(product_id, None)

    if product_index is not None:
        # Get the similarity scores for the specified product
        similar_scores = item_similarity[product_index]

        # Get the indices of the top-N most similar products
        top_n_similar_indices = similar_scores.argsort()[:-N-1:-1]

        # Get the actual product_ids of the top-N similar products
        top_n_similar_products = [int(dataset.iloc[i]['Product_id']) for i in top_n_similar_indices]

        return top_n_similar_products
    else:
        return None

@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    product_id = data.get('product_id', None)

    if product_id is not None:
        content_based_recommendations = get_content_based_recommendations(int(product_id))
        return jsonify({'recommendations': content_based_recommendations})
    else:
        return jsonify({'error': 'Invalid request'})

if __name__ == '__main__':
    app.run(debug=True)
