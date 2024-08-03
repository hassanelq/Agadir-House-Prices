# Agadir House Prices Prediction

## Description

Welcome to the Agadir House Prices Prediction tool! This project leverages machine learning to estimate real estate prices in Agadir, Morocco. The tool uses a Gradient Boosting Regressor model to provide accurate price predictions based on various property features.

## How It Works

1. **Data Collection**: 
   - We collect comprehensive real estate data from [Mubawab](https://www.mubawab.ma/), a leading property listing platform in Morocco. This data includes:
     - **Property Prices**: Historical and current sale prices.
     - **Property Features**: Size (square meters), number of bedrooms, number of bathrooms, type of property (apartment, villa, etc.), and location details within Agadir.

2. **Data Preparation**: 
   - **Cleaning**: The raw data is processed to handle missing values, outliers, and inconsistencies. This step ensures data quality and reliability.
   - **Transformation**: Data is transformed into a format suitable for machine learning. This includes:
     - **Normalization**: Scaling features to a uniform range to ensure model performance.
     - **Encoding**: Converting categorical variables (like property type) into numerical values.
     - **Feature Engineering**: Creating new features from existing data to enhance model accuracy (e.g., price per square meter).

3. **Model Training**: 
   - **Gradient Boosting Regressor**: We use an advanced Gradient Boosting Regressor model, which builds an ensemble of weak learners to improve prediction accuracy.
   - **Bayesian Optimization**: We optimize hyperparameters of the Gradient Boosting Regressor using Bayesian methods, which intelligently searches for the best parameters to enhance model performance.
   - **Validation**: We employ cross-validation techniques to evaluate the model's performance and avoid overfitting. This involves splitting the data into training and validation sets to test the model's predictive power.

4. **Model Hosting**: 
   - **Deployment**: The trained model is packaged and deployed on a server using Docker. This allows for:
     - **Scalability**: Handling multiple user requests simultaneously.
     - **Portability**: Ensuring the model runs consistently across different environments.
   - **API Integration**: The server exposes an API endpoint that receives property details from the web interface and returns price estimates.

5. **Real-Time Prediction**: 
   - **Web Interface**: Users interact with a user-friendly web interface to input property details such as size, location, and features.
   - **Request Handling**: The web application sends a POST request with the property details to the server's API.
   - **Price Estimation**: The server processes the request using the trained model and returns an estimated price in real-time.
   - **User Feedback**: The estimated price is displayed on the web interface, allowing users to see predictions immediately.

By following these steps, we provide users with a powerful tool for estimating real estate prices in Agadir, leveraging the latest advancements in machine learning and data science.


## Contact
Portfolio: https://elqadi.me

LinkedIn: [Hassan EL QADI](https://www.linkedin.com/in/el-qadi/)

