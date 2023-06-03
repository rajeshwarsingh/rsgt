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

export const getQuestionsApi = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/rsgt/questions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Return the response data if needed
    } else {
      throw new Error('getQuestionsApi request failed');
    }
  } catch (error) {
    console.log(error)
    throw new Error('An error occurred during the getQuestionsApi request');
  }
};

export const getStudyMaterialApi = async (std) => {
  try {
    const response = await fetch(`${BASE_URL}/rsgt/studyMaterials?std=${std}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Return the response data if needed
    } else {
      throw new Error('studymaterial request failed');
    }
  } catch (error) {
    throw new Error('An error occurred during the studymaterial request');
  }
};

export const doubtApi = async (doubtsData) => {
  try {
    const response = await fetch(`${BASE_URL}/rsgt/doubts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doubtsData),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Return the response data if needed
    } else {
      throw new Error('doubts request failed');
    }
  } catch (error) {
    throw new Error('An error occurred during the doubts request');
  }
};

export const getFaculty = async () => {
  try {
    const response = await fetch(`${BASE_URL}/rsgt/faculty`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Return the response data if needed
    } else {
      throw new Error('faculty request failed');
    }
  } catch (error) {
    throw new Error('An error occurred during the faculty request');
  }
};

export const getSubjects = async () => {
  try {
    const response = await fetch(`${BASE_URL}/rsgt/subjects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Return the response data if needed
    } else {
      throw new Error('faculty request failed');
    }
  } catch (error) {
    throw new Error('An error occurred during the faculty request');
  }
};