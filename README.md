# Agadir House Prices Prediction

## Description

Welcome to the Agadir House Prices Prediction tool! This project leverages machine learning to estimate real estate prices in Agadir, Morocco. The tool uses a Gradient Boosting Regressor model to provide accurate price predictions based on various property features.

## How It Works

1. **Data Collection**: We gather real estate data from [Mubawab](https://www.mubawab.ma/) including property prices, sizes, number of rooms, and other relevant features.
2. **Data Preparation**: The collected data is cleaned and transformed to ensure it is suitable for model training.
3. **Model Training**: We use an advanced Gradient Boosting Regressor model, optimized through Bayesian methods, to train on the prepared data.
4. **Model Hosting**: The trained model is deployed on a server using Docker, facilitating easy and scalable access.
5. **Real-Time Prediction**: Users can interact with the model through a web interface that sends property details to the server and receives instant price estimates.
