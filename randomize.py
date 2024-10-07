import pandas as pd

# Load the dataset
df = pd.read_csv('Gas_Sensors_Measurements.csv')

# Shuffle the rows
df_shuffled = df.sample(frac=1).reset_index(drop=True)

# Add a serial number column starting from 0
df_shuffled.insert(0, 'Serial_Number', range(len(df_shuffled)))

# Save the randomized dataset to a new CSV file
df_shuffled.to_csv('Randomized2_Gas_Sensors_Measurements.csv', index=False)

print("Dataset randomized successfully, and serial numbers starting from 0 are retained!")
