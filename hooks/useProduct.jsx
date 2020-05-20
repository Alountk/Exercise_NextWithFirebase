
  import React,{useEffect,useState,useContext} from 'react';
  import { FirebaseContext } from '../firebase'
  
  const useProduct = order => {
    const [products, setProducts] = useState([])

    const { firebase } =  useContext(FirebaseContext);
  
    useEffect(() => {
      const obtainProducts = () => {
        firebase.db.collection('products').orderBy(order,'desc').onSnapshot(useSnapshot)
      }
      obtainProducts();
    }, [])
  
    function useSnapshot(snapshot){
      const products = snapshot.docs.map( doc => {
        return {
          id:doc.id,
          ...doc.data()
        }
      });
      setProducts(products);
    }

    return{
        products
    }

  }
  export default useProduct;