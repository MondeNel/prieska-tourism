import { experiencesData as staticExperiences } from '../data/experiences';
import { accommodations as staticAccommodations } from '../data/accommodations';

const STORAGE_KEYS = {
  EXPERIENCES: 'karoo_experiences',
  ACCOMMODATIONS: 'karoo_accommodations'
};

// Initialize localStorage with static data if empty
export const initData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.EXPERIENCES)) {
    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(staticExperiences));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ACCOMMODATIONS)) {
    localStorage.setItem(STORAGE_KEYS.ACCOMMODATIONS, JSON.stringify(staticAccommodations));
  }
};

// Experiences
export const getExperiences = () => {
  const data = localStorage.getItem(STORAGE_KEYS.EXPERIENCES);
  return data ? JSON.parse(data) : staticExperiences;
};

export const updateExperience = (id, updatedData) => {
  const experiences = getExperiences();
  const index = experiences.findIndex(exp => exp.id === id);
  if (index !== -1) {
    experiences[index] = { ...experiences[index], ...updatedData };
    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(experiences));
    return true;
  }
  return false;
};

export const deleteExperience = (id) => {
  let experiences = getExperiences();
  experiences = experiences.filter(exp => exp.id !== id);
  localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(experiences));
  return true;
};

export const addExperience = (newExperience) => {
  const experiences = getExperiences();
  const newId = Math.max(...experiences.map(e => e.id), 0) + 1;
  const experienceToAdd = { ...newExperience, id: newId };
  experiences.push(experienceToAdd);
  localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(experiences));
  return experienceToAdd;
};

// Accommodations
export const getAccommodations = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ACCOMMODATIONS);
  return data ? JSON.parse(data) : staticAccommodations;
};

export const updateAccommodation = (id, updatedData) => {
  const accommodations = getAccommodations();
  const index = accommodations.findIndex(acc => acc.id === id);
  if (index !== -1) {
    accommodations[index] = { ...accommodations[index], ...updatedData };
    localStorage.setItem(STORAGE_KEYS.ACCOMMODATIONS, JSON.stringify(accommodations));
    return true;
  }
  return false;
};

export const deleteAccommodation = (id) => {
  let accommodations = getAccommodations();
  accommodations = accommodations.filter(acc => acc.id !== id);
  localStorage.setItem(STORAGE_KEYS.ACCOMMODATIONS, JSON.stringify(accommodations));
  return true;
};

export const addAccommodation = (newAccommodation) => {
  const accommodations = getAccommodations();
  const newId = Math.max(...accommodations.map(a => a.id), 0) + 1;
  const accToAdd = { ...newAccommodation, id: newId, reviews: [] };
  accommodations.push(accToAdd);
  localStorage.setItem(STORAGE_KEYS.ACCOMMODATIONS, JSON.stringify(accommodations));
  return accToAdd;
};