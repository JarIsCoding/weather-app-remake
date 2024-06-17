
// export const getlocalStorage = (): string[] => {
//   let localStorageData = localStorage.getItem('Favorites');

//   if (localStorageData === null) {
//     return [];
//   }
//   return JSON.parse(localStorageData);
// };

// export const saveToLocalStorage = (mon: string) => {
//   let favorites = getlocalStorage();
//   if (!favorites.includes(mon)) {
//     favorites.push(mon);
//   }
//   localStorage.setItem('Favorites', JSON.stringify(favorites));
// };

// export const removeFromLocalStorage = (weatherName: string) => {
//   let favorites = getlocalStorage();
//   favorites = favorites.filter((favorite) => favorite !== weatherName);
//   localStorage.setItem('Favorites', JSON.stringify(favorites));
// };