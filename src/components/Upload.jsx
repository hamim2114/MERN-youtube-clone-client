import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
   getStorage,
   ref,
   uploadBytesResumable,
   getDownloadURL,
} from 'firebase/storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
   width: 100%;
   height: 100%;
   position: fixed;
   top: 0;
   left: 0;
   background-color: #000000a7;
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 99;
`;

const Wrapper = styled.div`
   width: 600px;
   height: 600px;
   background-color: ${({ theme }) => theme.bgLighter};
   color: ${({ theme }) => theme.text};
   padding: 20px;
   display: flex;
   flex-direction: column;
   gap: 20px;
   position: relative;
`;
const Close = styled.div`
   position: absolute;
   top: 10px;
   right: 10px;
   cursor: pointer;
`;
const Title = styled.h1`
   text-align: center;
`;

const Input = styled.input`
   border: 1px solid ${({ theme }) => theme.soft};
   color: ${({ theme }) => theme.text};
   border-radius: 3px;
   padding: 10px;
   background-color: transparent;
   z-index: 999;
`;
const Desc = styled.textarea`
   border: 1px solid ${({ theme }) => theme.soft};
   color: ${({ theme }) => theme.text};
   border-radius: 3px;
   padding: 10px;
   background-color: transparent;
`;
const Button = styled.button`
   border-radius: 3px;
   border: none;
   padding: 10px 20px;
   font-weight: 500;
   cursor: pointer;
   background-color: ${({ theme }) => theme.soft};
   color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
   font-size: 14px;
`;
const Upload = ({ setOpen }) => {
   const [img, setImg] = useState(null);
   const [video, setVideo] = useState(null);
   const [videoPerc, setVideoPerc] = useState(0);
   const [imgPerc, setImgPerc] = useState(0);
   const [input, setInput] = useState({});
   const [tag, setTag] = useState([]);
console.log(input)
   const navigate = useNavigate()

   const handleTag = (e) => {
      setTag(e.target.value.split(','));
   };

   const handleChange = (e) => {
      setInput((prev) => {
         return { ...prev, [e.target.name]: e.target.value };
      });
   };

   const uploadFile = (file, urlType) => {
      const storage = getStorage();
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, 'images & videos/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
         'state_changed',
         (snapshot) => {
            const progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               urlType === 'imgUrl'
               ? setImgPerc(Math.round(progress))
               : setVideoPerc(Math.round(progress));
         },
         (error) => {},
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               setInput((prev) => {
                  return { ...prev, [urlType]: downloadURL };
               });
            });
         }
      );
   };

   useEffect(() => {
      video && uploadFile(video, 'videoUrl');
   }, [video]);
   useEffect(() => {
      img && uploadFile(img, 'imgUrl');
   }, [img]);

   const handleSubmit = async () => {
      try {
         const res = await axios.post('/api/videos', {...input, tag})
         setOpen(false)
         navigate(`/video/${res.data._id}`)
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <Container>
         <Wrapper>
            <Close onClick={() => setOpen(false)}>X</Close>
            <Title>Upload a New Video</Title>
            <Label>Video:</Label>
            {videoPerc > 0 ? (
               'Uploading: ' + videoPerc + '%'
            ) : (
               <Input
                  type='file'
                  accept='video/*'
                  onChange={(e) => setVideo(e.target.files[0])}
               />
            )}
            <Input
               type='text'
               placeholder='Title'
               name='title'
               onChange={handleChange}
            />
            <Desc
               placeholder='Description'
               name='desc'
               rows={8}
               onChange={handleChange}
            />
            <Input
               type='text'
               placeholder='{ tags } Separate tag with commas'
               onChange={handleTag}
            />
            <Label>Image:</Label>
            {imgPerc > 0 ? ('Upoloading: ' + imgPerc + '%') : (<Input
               type='file'
               accept='image/*'
               onChange={(e) => setImg(e.target.files[0])}
            />) }
            <Button onClick={handleSubmit}>Upload</Button>
         </Wrapper>
      </Container>
   );
};

export default Upload;
