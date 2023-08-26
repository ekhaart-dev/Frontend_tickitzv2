import React,{useState, useEffect} from "react";
import Header from "../../../../component/header";
import { Formik } from "formik";
import useApi from "../../../../helper/useApi";
import {  AiOutlinePicture } from 'react-icons/ai'
import { useSelector } from "react-redux";

function Admin_Movie_update(){
    const api = useApi
    const [selectedPicture, setSelectedPicture] = React.useState(false)
    const [pictureURI, setPictureURI] = React.useState('')
    const [pictureErr, setPictureErr] = React.useState(true)

    const createMovie = async(values, {resetForm}) => {
        if (!selectedPicture) {
          setPictureErr(false)
          return
      } else {
          setPictureErr(true)
      }

      const form = new FormData()
      Object.keys(values).forEach((key) => {
          if (values[key]) {
              if (key === 'release_date_movie') {
                  form.append(key, moment(values[key]).format('YYYY-MM-DD'))
              } else {
                  form.append(key, values[key])
              }
          }

          
      })

      if (selectedPicture) {
        form.append('url_image_movie', selectedPicture)
      }


      const {data} = await api(token).post('/movie', form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      })
      setSelectedPicture(false)
      resetForm()

    }
    const fileToDataUrl = (file) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setPictureURI(reader.result)
        })
        reader.readAsDataURL(file)
    }
      
      const changePicture = (e) => {
        const file = e.target.files[0]
        setSelectedPicture(file)
        fileToDataUrl(file)
    }

    const formattedDuration = () => {
        const hour = parseInt(values.duration_hour) || 0;
        const minute = parseInt(values.duration_minute) || 0;
    
        if (hour === 0) {
          return `${minute} Minute`;
        } else if (minute === 0) {
          return `${hour} Hour`;
        } else {
          return `${hour} Hour ${minute} Minute`;
        }
      };

    return(
        <>
        <Header />
        <div className="bg-gray-200 w-full h-full flex flex-col items-center">
            <div className="w-7/12 bg-white p-10 my-5 rounded-lg">
                <h1 className="font-bold text-lg">Update Movie</h1>
                <div>
                    <Formik
                    initialValues={{
                        title_movie: '',
                        director_movie: '',
                        duration_movie: '',
                        casts_movie: [],
                        synopsis_movie: '',
                        release_date_movie: '',
                        url_image_movie: '',
                        city:'',
                        date_start: '',
                        date_end: '',
                    }} onSubmit={createMovie}>
                {({
                  handleChange, handleBlur, handleSubmit,errors, touched, values
                })=> (
                        <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2 my-5 w-2/12">
                            <div className="border-2 rounded-lg mb-4">
                                {!selectedPicture && (
                                <div className="h-52 flex items-center justify-center">
                                <i className=''>
                                    <AiOutlinePicture size={50} />
                                </i>
                                </div>
                                )}
                                
                                {selectedPicture && <img src={pictureURI} alt="Banner" />}
                            </div>
                            <label className='btn bg-[#fff] w-full h-10 rounded-xl border-2 border-[#3366FF] text-[#3366FF] text-sm font-semibold tracking-[1px] mb-4'>
                                <span>Choose photo</span>
                                <input name='picture' onChange={changePicture} className='hidden' type='file' />
                            </label>
                            {!pictureErr && (
                                <label className='label'>
                                    <span className='label-text-alt text-error'>Please insert event picture!</span>
                                </label>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Movie Name</label>
                            <input type="text" name="title_movie" 
                            className="border-2 rounded p-5 border-gray-200"                               
                            value={values.title_movie}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Category</label>
                            <input type="text" name="name_genre" 
                            className="border-2 rounded p-5 border-gray-200"                               
                            value={values.name_genre}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        </div>
                        <div className="flex justify-between gap-5">
                            <div className="flex flex-col gap-2 mt-3 w-full">
                                <label>Release date</label>
                                <input type="text" name="release_date_movie" 
                                className="border-2 rounded p-5 border-gray-200"                               
                                value={values.release_date_movie}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            </div>
                            <div className="flex flex-col gap-2 mt-3">
                                <label>Duration (hour / minute)</label>
                                <div className="flex gap-5">
                                    <input type="text" name="duration_movie" 
                                    className="border-2 rounded p-5 border-gray-200"                               
                                    value={values.duration_movie}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                    <input type="text" name="duration_movie" 
                                    className="border-2 rounded p-5 border-gray-200"                               
                                    value={values.duration_movie}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Director Name</label>
                            <input type="text" name="director_movie" 
                            className="border-2 rounded p-5 border-gray-200"                               
                            value={values.director_movie}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Casts</label>
                            <input type="text" name="casts_movie" 
                            className="border-2 rounded p-5 border-gray-200"                               
                            value={values.casts_movie}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Synopsis</label>
                            <div className='w-full'>
                                <textarea
                                    name='synopsis_movie'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.synopsis_movie}
                                    className='border-2 border-gray-200 w-full rounded text-sm tracking-[1px] px-3.5 py-3.5'
                                    cols='30'
                                    rows='5'
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Add Location</label>
                            <input type="text" name="city" 
                            className="border-2 rounded p-5 border-gray-200"                               
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        </div>
                        <div className="flex flex-col gap-2 mt-3">
                            <label>Set Date & Time</label>
                            <div className="flex gap-3 items-center">
                                <input type="date" name="date_start" 
                                className="border-2 rounded p-5 border-gray-200"                               
                                value={values.date_start}
                                onChange={handleChange}
                                onBlur={handleBlur} />

                                <h2>to</h2>

                                <input type="date" name="date_end" 
                                className="border-2 rounded p-5 border-gray-200"                               
                                value={values.date_end}
                                onChange={handleChange}
                                onBlur={handleBlur} />

                            </div>
                        </div>
                        <hr className="my-5"/>
                        <button className="w-full bg-primary font-bold text-white py-3 rounded">Save Movie</button>

                        </form>
                    )}

                    </Formik>

                </div>
            </div>
        </div>
        </>
    )
}

export default Admin_Movie_update