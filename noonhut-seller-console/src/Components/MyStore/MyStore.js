import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '@mui/icons-material/Dashboard';
import { MenuList } from '@material-ui/core';
import PersonIcon from '@mui/icons-material/Person';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import "./MyStore.css";
import { auth, db, storage } from '../../Firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { onAuthStateChanged } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const MyStore = () => {
    const [loggedInSeller, setLoggedInSeller] = useState();
    const [dropDown, setDropDown] = useState(false);
    const [products, setProducts] = useState([]);

    const [category, setCategory] = useState("0");
    const [productName, setProductName] = useState("0");
    const [brand, setBrand] = useState("0");
    const [packaging, setPackaging] = useState("0");
    const [quantityInStock, setQuantityInStock] = useState("0");
    const [price, setPrice] = useState("0");
    const [barcode, setBarcode] = useState("0");
    const [details, setDetails] = useState("0");
    const [ingredients, setIngredients] = useState("0");
    const [directions, setDirections] = useState("0");

    const hiddenUploadImageInput1 = useRef(null);
    const hiddenUploadImageInput2 = useRef(null);

    const [uploadImg1, setUploadImg1] = useState();
    const [uploadImg2, setUploadImg2] = useState();

    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);

    const [productImgPreview, setProductImgPreview] = useState(undefined);
    const [nutritionImgPreview, setNutritionImgPreview] = useState(undefined);

    const toggleDropDown = () => {
        setDropDown((prevState) => !prevState);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentSeller) => {
            setLoggedInSeller(currentSeller);
        });

        const fetchProducts = async () => {
            const sellerProfileRef = doc(db, "sellers_profile", loggedInSeller.uid);
            const sellerProfileInfo = await getDoc(sellerProfileRef);
            const sellerStoreName = sellerProfileInfo.data().STORE_NAME;
            const sellerBranchCity = sellerProfileInfo.data().BRANCH_CITY;
            const sellerBranchNumber = sellerProfileInfo.data().BRANCH_NUMBER;
            const productCollectionRef = collection(db, `${sellerStoreName + '_' + sellerBranchCity + '_' + sellerBranchNumber + '_' + loggedInSeller.uid}`);
            const data = await getDocs(productCollectionRef);
            setProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        if (loggedInSeller)
        {
            fetchProducts();
        }

        if (!uploadImg1)
        {
            setProductImgPreview(undefined);
        }
        else
        {
            const productImgUrl = URL.createObjectURL(uploadImg1);
            setProductImgPreview(productImgUrl);
        }

        if (!uploadImg2)
        {
            setNutritionImgPreview(undefined);
        }
        else
        {
            const nutritionImgUrl = URL.createObjectURL(uploadImg2);
            setNutritionImgPreview(nutritionImgUrl);
        }

    }, [edit, save, loggedInSeller, uploadImg1, uploadImg2]);
    
    const tableHead = [
        "Document ID",
        "Category",
        "Product Name",
        "Brand",
        "Packaging",
        "Quantity In Stock",
        "Price",
        "Barcode",
        "Details",
        "Ingredients",
        "Directions",
        "Product Picture",
        "Nutrition Picture",
    ];
    
    const addRecordInTable = async () => {
        const sellerProfileRef = doc(db, "sellers_profile", loggedInSeller.uid);
        const sellerProfileInfo = await getDoc(sellerProfileRef);
        const sellerStoreName = sellerProfileInfo.data().STORE_NAME;
        const sellerBranchCity = sellerProfileInfo.data().BRANCH_CITY;
        const sellerBranchNumber = sellerProfileInfo.data().BRANCH_NUMBER;
        const productCollectionRef = collection(db, `${sellerStoreName + '_' + sellerBranchCity + '_' + sellerBranchNumber + '_' + loggedInSeller.uid}`);

        const newProduct = {
            CATEGORY: "0",
            PRODUCT_NAME: "0",
            BRAND: "0",
            PACKAGING: "0",
            QUANTITY_IN_STOCK: "0",
            PRICE: "0",
            BARCODE: "0",
            DETAILS: "0",
            INGREDIENTS: "0",
            DIRECTIONS: "0",
            QUANTITY: 0,
            EDIT_DETAILS: false
        };

        await addDoc(productCollectionRef, newProduct);
        window.location.reload();
    }

    const updateRecordInTable =  async (id) => {
        const sellerProfileRef = doc(db, "sellers_profile", loggedInSeller.uid);
        const sellerProfileInfo = await getDoc(sellerProfileRef);
        const sellerStoreName = sellerProfileInfo.data().STORE_NAME;
        const sellerBranchCity = sellerProfileInfo.data().BRANCH_CITY;
        const sellerBranchNumber = sellerProfileInfo.data().BRANCH_NUMBER;
        const updateProductInfo = doc(db, `${sellerStoreName + '_' + sellerBranchCity + '_' + sellerBranchNumber + '_' + loggedInSeller.uid}`, id);

        await updateDoc(updateProductInfo, {
            CATEGORY: (category.toLowerCase()),
            PRODUCT_NAME: productName,
            BRAND: brand,
            PACKAGING: packaging,
            QUANTITY_IN_STOCK: quantityInStock,
            PRICE: price,
            BARCODE: barcode,
            DETAILS: details,
            INGREDIENTS: ingredients,
            DIRECTIONS: directions,
            EDIT_DETAILS: false
        });

        setEdit(false);
        setSave(true);
    }

    const deleteRecordInTable = async (id) => {
        const sellerProfileRef = doc(db, "sellers_profile", loggedInSeller.uid);
        const sellerProfileInfo = await getDoc(sellerProfileRef);
        const sellerStoreName = sellerProfileInfo.data().STORE_NAME;
        const sellerBranchCity = sellerProfileInfo.data().BRANCH_CITY;
        const sellerBranchNumber = sellerProfileInfo.data().BRANCH_NUMBER;
        const deleteProductInfo = doc(db, `${sellerStoreName + '_' + sellerBranchCity + '_' + sellerBranchNumber + '_' + loggedInSeller.uid}`, id);
        await deleteDoc(deleteProductInfo);
        window.location.reload();
    }

    const browseImage1 = () => {
        hiddenUploadImageInput1.current.click();
    }

    const handleUploadImage1 = async (id) => {
        if (!uploadImg1)
        {
            return;
        }
        else
        {
            const sellerProfile = doc(db, "sellers_profile", loggedInSeller.uid);
            const sellerProfileInfo = await getDoc(sellerProfile);
            const sellerStoreName = sellerProfileInfo.data().STORE_NAME;
            const sellerBranchCity = sellerProfileInfo.data().BRANCH_CITY;
            const sellerBranchNumber = sellerProfileInfo.data().BRANCH_NUMBER;

            const productRefOfSeller = doc(db, `${sellerStoreName + '_' + sellerBranchCity + '_' + sellerBranchNumber + '_' + loggedInSeller.uid}`, id);
            const productOfSeller = await getDoc(productRefOfSeller);
            const productCategory = (productOfSeller.data().CATEGORY).toLowerCase();
            const imageRef = ref(storage, `sellers_mystore/${sellerStoreName + '_' + sellerBranchCity + '_' + sellerBranchNumber + '_' + loggedInSeller.uid}/${productCategory}/${uploadImg1.name}`);
            
            uploadBytes(imageRef, uploadImg1).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async(url) => {
                    const product = doc(db, `${sellerStoreName + '_' + sellerBranchCity + '_' + sellerBranchNumber + '_' + loggedInSeller.uid}`, id);
                    await updateDoc(product, {
                        PRODUCT_PICTURE: url      
                    });
                });
            });
        }
    }

    const browseImage2 = () => {
        hiddenUploadImageInput2.current.click();
    }
    
    const handleUploadImage2 = async (id) => {
        if (!uploadImg2)
        {
            return;
        }
        else
        {
            const sellerProfile = doc(db, "sellers_profile", loggedInSeller.uid);
            const sellerProfileInfo = await getDoc(sellerProfile);
            const sellerStoreName = sellerProfileInfo.data().STORE_NAME;
            const sellerBranchCity = sellerProfileInfo.data().BRANCH_CITY;
            const sellerBranchNumber = sellerProfileInfo.data().BRANCH_NUMBER;
            const imageRef = ref(storage, `sellers_mystore/${sellerStoreName + '_' + sellerBranchCity + '_' + sellerBranchNumber + '_' + loggedInSeller.uid}/${uploadImg2.name}`);

            uploadBytes(imageRef, uploadImg2).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async(url) => {
                    const product = doc(db, `${sellerStoreName + '_' + sellerBranchCity + '_' + sellerBranchNumber + '_' + loggedInSeller.uid}`, id);
                    await updateDoc(product, {
                        NUTRITION_PICTURE: url
                    });
                })
            });
        }
    }

    const editProductField = async (id) => {
        const sellerProfile = doc(db, "sellers_profile", loggedInSeller.uid);
        const sellerProfileInfo = await getDoc(sellerProfile);
        const sellerStoreName = sellerProfileInfo.data().STORE_NAME;
        const sellerBranchCity = sellerProfileInfo.data().BRANCH_CITY;
        const sellerBranchNumber = sellerProfileInfo.data().BRANCH_NUMBER;
        const product = doc(db, `${sellerStoreName + '_' + sellerBranchCity + '_' + sellerBranchNumber + '_' + loggedInSeller.uid}`, id);
        await updateDoc(product, {
            EDIT_DETAILS: true
        });
        setEdit(true);
    }

    return (
        <div className="container-of-seller-my-store">
            <div className="navbar-of-seller-my-store">
                <div className='name-of-component-my-store'>
                    <p>My Store</p>
                </div>

                <div className="div-for-dashboard-and-profile-icon-my-store">
                    <div className="search-bar-div-my-store">
                        <input type="text" placeholder='Search' />
                        <SearchIcon />
                    </div>
                    <div className="dashboard-icon">
                        <Link to="/" className='links-for-icons-of-navbar'>
                            <Dashboard />
                        </Link>
                    </div>
                    <div className="profile-icon">
                        <button onClick={toggleDropDown} className='links-for-icons-of-navbar'>
                            <PersonIcon />
                        </button>
                        {
                            dropDown &&
                            <MenuList id="menu-list-of-navbar-my-store">
                                <Link to="/seller-console/seller-profile">Profile</Link>
                                <Link to="">Sign-out</Link>
                            </MenuList>
                        }
                    </div>
                </div>
            </div>

            <TableContainer className='mui-table-container-of-my-store'>
                <div>
                    <h5>My Store</h5>
                </div>
                <Table className='mui-table-of-my-store'>
                    <TableHead>
                        <TableRow>
                            {tableHead.map((head) => {
                                return <TableCell>
                                    <TableSortLabel active={true}>{head}</TableSortLabel>
                                </TableCell>
                            })}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {products.map((product) => {
                            return (
                                <tr>
                                    <td className='td-of-my-store-table'>{product.id}</td>
                                    <td className='td-of-my-store-table'>
                                        <span className={product.EDIT_DETAILS ? "not-visible-span" : "visible-span" }>{product.CATEGORY}</span>
                                        <input type="text" className={product.EDIT_DETAILS ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => setCategory(e.target.value)}/>
                                    </td>
                                    <td className='td-of-my-store-table'>
                                        <span className={product.EDIT_DETAILS ? "not-visible-span" : "visible-span" }>{product.PRODUCT_NAME}</span>
                                        <input type="text" className={product.EDIT_DETAILS ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => setProductName(e.target.value)}/>
                                    </td>
                                    <td className='td-of-my-store-table'>
                                        <span className={product.EDIT_DETAILS ? "not-visible-span" : "visible-span"}>{product.BRAND}</span>
                                        <input type="text" className={product.EDIT_DETAILS ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => setBrand(e.target.value)}/>
                                    </td>
                                    <td className='td-of-my-store-table'>
                                        <span className={product.EDIT_DETAILS ? "not-visible-span" : "visible-span"}>{product.PACKAGING}</span>
                                        <input type="text" className={product.EDIT_DETAILS ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => setPackaging(e.target.value)}/>
                                    </td>
                                    <td className='td-of-my-store-table'>
                                        <span className={product.EDIT_DETAILS ? "not-visible-span" : "visible-span"}>{product.QUANTITY_IN_STOCK}</span>
                                        <input type="text" className={product.EDIT_DETAILS ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => setQuantityInStock(e.target.value)}/>
                                    </td>
                                    <td className='td-of-my-store-table'>
                                        <span className={product.EDIT_DETAILS ? "not-visible-span" : "visible-span"}>{product.PRICE}</span>
                                        <input type="text" className={product.EDIT_DETAILS ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => 
                                        setPrice(e.target.value)}/>
                                    </td>
                                    <td className='td-of-my-store-table'>
                                        <span className={product.EDIT_DETAILS ? "not-visible-span" : "visible-span"}>{product.BARCODE}</span>
                                        <input type="text" className={product.EDIT_DETAILS ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => setBarcode(e.target.value)}/>
                                    </td>
                                    <td className='td-of-my-store-table'>
                                        <span className={product.EDIT_DETAILS ? "not-visible-span" : "visible-span"}>{product.DETAILS}</span>
                                        <input type="text" className={product.EDIT_DETAILS ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => 
                                        setDetails(e.target.value)}/>
                                    </td>
                                    <td className='td-of-my-store-table'>
                                        <span className={product.EDIT_DETAILS ? "not-visible-span" : "visible-span"}>{product.INGREDIENTS}</span>
                                        <input type="text" className={product.EDIT_DETAILS ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => setIngredients(e.target.value)}/>
                                    </td>
                                    <td className='td-of-my-store-table'>
                                        <span className={product.EDIT_DETAILS ? "not-visible-span" : "visible-span"}>{product.DIRECTIONS}</span>
                                        <input type="text" className={product.EDIT_DETAILS ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => 
                                        setDirections(e.target.value)}/>
                                    </td>
                                    <td className='td-of-my-store-table'>
                                        <img src={productImgPreview !== undefined ? productImgPreview : product.PRODUCT_PICTURE} className='uploaded-images-of-my-store' alt="" />
                                        <div className='upload-img-div-my-store'>
                                            <button className="browse-upload-img-btn-my-store" onClick={browseImage1} disabled={product.CATEGORY === "0" || product.PRODUCT_NAME === "0" || product.BRAND === "0" || product.PRICE === "0" || product.DETAILS === "0"}>Browse</button>
                                            <button className="browse-upload-img-btn-my-store" onClick={() => handleUploadImage1(product.id)} disabled={product.CATEGORY === "0" || product.PRODUCT_NAME === "0" || product.BRAND === "0" || product.PRICE === "0" || product.DETAILS === "0"}>Upload</button>
                                            <input type="file" accept='image/*' className='hidden-upload-image-inputs' ref={hiddenUploadImageInput1} onChange={(e) => setUploadImg1(e.target.files[0])}/>
                                        </div>
                                    </td>
                                    <td className='td-of-my-store-table'>
                                        <img src={nutritionImgPreview !== undefined ? nutritionImgPreview : product.NUTRITION_PICTURE} className='uploaded-images-of-my-store' alt="" />
                                        <div className='upload-img-div-my-store'>
                                            <button className="browse-upload-img-btn-my-store" onClick={browseImage2} disabled={product.CATEGORY === "0" || product.PRODUCT_NAME === "0" || product.BRAND === "0" || product.PRICE === "0" || product.DETAILS === "0"}>Browse</button>
                                            <button className="browse-upload-img-btn-my-store" onClick={() => handleUploadImage2(product.id)} disabled={product.CATEGORY === "0" || product.PRODUCT_NAME === "0" || product.BRAND === "0" || product.PRICE === "0" || product.DETAILS === "0"}>Upload</button>
                                            <input type="file" accept='image/*' className='hidden-upload-image-inputs' ref={hiddenUploadImageInput2} onChange={(e) => setUploadImg2(e.target.files[0])}/>
                                        </div>
                                    </td>
                                    <td>
                                        <button className='edit-delete-save-btn-of-my-store-table' onClick={() => editProductField(product.id)}>
                                            <EditIcon/>
                                        </button>
                                    </td>
                                    <td>
                                        <button className='edit-delete-save-btn-of-my-store-table' onClick={() => updateRecordInTable(product.id)}>
                                            <SaveIcon/>
                                        </button>
                                    </td>
                                    <td>
                                        <button className='edit-delete-save-btn-of-my-store-table' onClick={() => deleteRecordInTable(product.id)}>
                                            <DeleteIcon/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="div-for-btns-of-my-store">
                <button className="upload-file-btn-of-my-store" onClick={addRecordInTable}>
                    <span>ADD A RECORD</span>
                </button>
            </div>
        </div>
    )
}

export default MyStore;