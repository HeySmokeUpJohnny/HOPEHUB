import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAllCategories } from '../../services/categoryService'; // doğru path ile güncelle
import { addProduct } from '../../services/productService'; // doğru path ile güncelle

const AddProductToStore = () => {
    const [categories, setCategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                console.log(response.data)
                setCategories(response.data); // gelen veri [{ id, name, subCategories: [...] }]
            } catch (error) {
                console.error('Kategori verisi alınamadı:', error);
            }
        };

        fetchCategories();
    }, []);

    const initialValues = {
        productName: '',
        productDescription: '',
        productPrice: '',
        productQuantity: '',
        categoryId: '',
        subCategoryId: '',
    };

    const validationSchema = Yup.object({
        productName: Yup.string().required('Ürün adı zorunludur'),
        productDescription: Yup.string().required('Ürün Açıklaması zorunludur'),
        productPrice: Yup.string().required('Ürün Fiyat Alanı zorunludur'),
        productQuantity: Yup.string().required('Ürün Miktar Alanı zorunludur'),
        categoryId: Yup.string().required('Kategori seçiniz'),
        subCategoryId: Yup.string().required('Alt kategori seçiniz'),
    });

    const handleCategoryChange = (e, setFieldValue) => {
        const selectedCategoryId = parseInt(e.target.value);
        setFieldValue('categoryId', selectedCategoryId);
        setFieldValue('subCategoryId', '');

        //const selectedCategory = categories.filter(cat => cat.categoryId === selectedCategoryId);
        const selectedCategory = categories.find(cat => cat.categoryId === selectedCategoryId);
        console.log(selectedCategory.subcategories);
        setFilteredSubcategories(selectedCategory.subcategories);
    };

    const onSubmit = (values) => {
        console.log('Form verileri:', values);
        addProduct(values);

    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values, setFieldValue }) => (
                <Form className="space-y-4 p-4 max-w-md mx-auto">
                    <div>
                        <label htmlFor="productName">Ürün Adı</label>
                        <Field name="productName" type="text" className="border p-2 w-full" />
                        <ErrorMessage name="productName" component="div" className="text-red-500" />
                    </div>
                    <div>
                        <label htmlFor="productDescription">Ürün Açıklaması</label>
                        <Field name="productDescription" type="text" className="border p-2 w-full" />
                        <ErrorMessage name="productDescription" component="div" className="text-red-500" />
                    </div>
                    <div>
                        <label htmlFor="productPrice">Ürün Fiyat</label>
                        <Field name="productPrice" type="text" className="border p-2 w-full" />
                        <ErrorMessage name="productPrice" component="div" className="text-red-500" />
                    </div>
                    <div>
                        <label htmlFor="productQuantity">Ürün Miktar</label>
                        <Field name="productQuantity" type="text" className="border p-2 w-full" />
                        <ErrorMessage name="productQuantity" component="div" className="text-red-500" />
                    </div>

                    <div>
                        <label htmlFor="categoryId">Kategori</label>
                        <Field
                            as="select"
                            name="categoryId"
                            onChange={(e) => handleCategoryChange(e, setFieldValue)}
                            className="border p-2 w-full"
                        >
                            <option value="">Seçiniz</option>
                            {categories.map((cat) => (
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="categoryId" component="div" className="text-red-500" />
                    </div>

                    <div>
                        <label htmlFor="subCategoryId">Alt Kategori</label>
                        <Field
                            as="select"
                            name="subCategoryId"
                            className="border p-2 w-full"
                            disabled={!values.categoryId}
                        >
                            <option value="">Seçiniz</option>
                            {filteredSubcategories.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="subCategoryId" component="div" className="text-red-500" />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Kaydet
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default AddProductToStore;
