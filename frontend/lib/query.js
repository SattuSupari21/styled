export const PRODUCT_QUERY =`
query{
    items (pagination: {limit: 20}){
      data{
        attributes{
          Product_id
          BrandName
          Individual_category
          Description
          Price
          slug
          Image{
            data{
              attributes{
                formats
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_QUERY = `
  query getProduct($slug: String!) {
    items(filters: {slug: {eq: $slug}}) {
      data {
        attributes {
          Product_id,
          BrandName,
          Individual_category,
          Description,
          Price,
          slug,
          Image {
            data {
              attributes {
                formats
              }
            }
          }
        }
      }
    }
  }
`

// export const PRODUCT_QUERY =`
// query{
//     products{
//       data{
//         attributes{
//           title
//           description
//           price
//           slug
//           image{
//             data{
//               attributes{
//                 formats
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
//
// export const GET_PRODUCT_QUERY = `
//   query getProduct($slug: String!) {
//     products(filters: {slug: {eq: $slug}}) {
//       data {
//         attributes {
//           price,
//           title,
//           slug,
//           description,
//           image {
//             data {
//               attributes {
//                 formats
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `