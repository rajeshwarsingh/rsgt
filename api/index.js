const BASE_URL = 'https://edu-backend-git-main-rajeshwarsingh.vercel.app/api'; // Replace with your actual API base URL

export const signupApi = async (signupData) => {
  try {
    const response = await fetch(`${BASE_URL}/rsgt/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Return the response data if needed
    } else {
      throw new Error('Signup request failed');
    }
  } catch (error) {
    throw new Error('An error occurred during the signup request');
  }
};
