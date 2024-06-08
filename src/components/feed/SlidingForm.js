import React, { useState } from 'react';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import toast, { Toaster } from 'react-hot-toast';

const SlidingForm = ({id}) => {
    const [formData, setFormData] = useState({
        subject: '',
        attachment: null,
        description: ''
    });

    var getToken = localStorage.getItem('access');
    // console.log("getted",getToken)

    // const handleChange = (e) => {
    //     const { name, value, files } = e.target;
    //     const newValue = files ? files[0] : value;
    //     setFormData((prevData) => {
    //         const updatedFormData = new FormData(prevData);
    //         updatedFormData.set(name, newValue);
    //         return updatedFormData;
    //     });
    // };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
      };

      const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({...formData,[name]:value})
      }




    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        try{
            const postData = await axios.post(`${endpoints.post_company_apply}${id}/`,formData,{
                headers:{
                    Authorization: 'Bearer ' + getToken,
                    "content-type": "multipart/form-data",
                }
            })
            console.log("post querry",postData)
            toast.success(postData.data.message || "Form Submitted Successfully")
    
        }
        catch(error){
            console.log(error)
            toast.error(error.response.data.message ||"Form Not Submitted.")
        }
        console.log("Form Data", formData);
        setFormData({
            subject: '',
            attachment: null,
            description: ''
        })
    };

    // if (!isVisible) return null;

    return (
        <div style={{ padding: 16, backgroundColor: '#fff', borderRadius: 10 }}>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Subject
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            style={{ width: '100%', padding: 8, marginTop: 8 }}
                            required
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label >
                        Attachment

                        <div style={{ display: "flex" }}>
                            <input
                                type="file"
                                name="attachment"
                                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                                onChange={handleFileChange}
                                style={{ display: 'block', marginTop: 8 }}
                                required
                            />
                            <span style={{ paddingTop: "8px" }}>*Allowed Img, pdf, doc</span>

                        </div>
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Description
                        <textarea
                            name="description"
                            rows="4"
                            cols="50"
                            value={formData.description}
                            onChange={handleChange}
                            style={{ width: '100%', padding: 8, marginTop: 8 }}
                            required
                        />
                    </label>
                </div>
                <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#F26522', color: '#fff', border: 'none', borderRadius: 4 }}>
                    Submit
                </button>
            </form>
            <Toaster 
         position="top-right"
         reverseOrder={false} />
        </div>
    );
};

export default SlidingForm;
