import jsonData from '../data/Pets.json';

// Function to get the picture URL
export const getPicture = (id) => {
  // Find the item in jsonData.data with the matching rbxassetid
  const item = jsonData.data.find(item => item.configName.match(id));

  if (!item) {
    console.log('Item not found');
    return null; // Or handle the not found case as appropriate for your use case
  }

  // Extract the numeric ID from the thumbnail's rbxassetid
  const rbxassetidNumeric = item.configData.thumbnail.match(/\d+/)[0];
  
  // Format the API URL with the extracted numeric ID
  const apiUrl = `https://biggamesapi.io/image/${rbxassetidNumeric}`;

  return apiUrl;
};

// Example usage:
console.log(getPicture('14976518880'));
