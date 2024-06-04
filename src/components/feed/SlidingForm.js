import React, { useState } from 'react';

const SlidingForm = () => {

    const [formData, setFormData] = useState({
        subject: '',
        attachment: null,
        description: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
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
                                onChange={handleChange}
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
        </div>
    );
};

export default SlidingForm;
