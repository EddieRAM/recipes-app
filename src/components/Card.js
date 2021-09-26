// import React from 'react';

// export default function Card({ recommendation }) {
//   if (!recommendation) {
//     return <div>Loading...</div>;
//   }
//   console.log(recommendation);

//   return (
//     <div>
//       {recommendation.map((item, index) => {
//         const max = 6;
//         console.log(item);
//         if (index < max) {
//           return (
//             <div id={ `${index}-recomendation-card` } data-testid={ `${index}-recomendation-card` }>
//               <img src={ `${item.strMealThumb}` } alt={ item.strMeal } />
//               <h3>{item.strCategory}</h3>
//               <h1>{item.strMeal}</h1>
//             </div>
//           );
//         }
//         return 'oi';
//       })}
//     </div>
//   );
// }
