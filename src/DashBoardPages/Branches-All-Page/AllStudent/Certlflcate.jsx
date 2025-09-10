// In your React component (e.g., AdmitCardComponent.js)
import React from 'react';

const Certlflcate = ({ student }) => {
  
  const handleDownload = async (student) => {
    console.log(student);
    try {
      
      const response = await fetch('http://localhost:5000/api/generate-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });

      
      if (!response.ok) {
        throw new Error('Failed to generate admit card');
      }

      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download(Do not touch)
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `admit_card_${student.rollNo}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Download error:', error);
      alert('Could not download the admit card. Please try again.');
    }
  };

  return (
    <button onClick={()=>handleDownload(student)}>
    Certlflcate
    </button>
  );
};

export default Certlflcate;