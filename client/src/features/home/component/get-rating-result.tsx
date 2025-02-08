export const getproductRatings=(ratings:any)=>{
  if (!ratings || ratings.length === 0) return 0;

  const total = (ratings.reduce((sum:number, rating:any) => sum + (rating.ratingStar || 0), 0)).toFixed(1);
  return total / ratings.length;
}