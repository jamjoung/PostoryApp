import React, { useState, useEffect } from 'react'
import LocationPin from './LocationPin.jsx'
import locations from './locations.jsx'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import AddPin from './AddPin.jsx'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { db } from '.././firebaseServices.tsx'
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import Modal from 'react-modal'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import LoadingScreen from 'react-loading-screen';
import Select from 'react-select'
// import {filterTags, setFilterTags} from '.././filterTags.jsx'
import config from '../config.js'

export default function Map(props) {

    const [pins, setPins] = useState([])
    const [filteredPins, setFilteredPins] = useState([])
    const [loading, setLoading] = useState(true);
	
    async function getData() {
        //const dbRef = ref(db);
        await getDocs(collection(db, "pins"))
            .then((snapshot) => {
                if (snapshot.docs.length > 0) {
                    const doc_array = [];
                    snapshot.docs.forEach(doc => {
                        // doc is a DocumentSnapshot with actual data
						var temp = doc.data();
						temp.docID = doc.id;
						doc_array.push(temp);
                        //doc_array.push(doc.data());
                    })
                    setPins(doc_array);
                    setFilteredPins(doc_array);
                    setLoading(false);
                }
                else {
                    console.log("No data available");
                    setPins([]);
                    setFilteredPins([]);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    // React.useEffect(() => getData, [])

    
    React.useEffect(() => {
        getData();
        // console.log(pins)
    }, [])

    const customStyles = {
        content: {
            top: '65%',
            left: '72%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '30em',
            height: '20em',
			backgroundColor: "#f5f2e9",
        },
    };
    // writeToDbTest();
    const mapStyles = {
        height: "80vh",
        width: "80%",
        display: "flex",
        alignItems: "center"
    };

    const defaultCenter = {
        lat: 40.0150, lng: -105.270546
    }

    const [selected, setSelected] = useState({});
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [tag, setTag] = useState("")
    const [stamp, setStamp] = useState("https://cdn.discordapp.com/attachments/694290659733143563/1076622014812528701/stampGeneral.png")

    const [msg, setMsg] = useState("")


    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal(e) {
        setIsOpen(true);
        setLat(e.latLng.lat())
        setLng(e.latLng.lng())
    }

    function closeModal() {
        setIsOpen(false);
    }

    const onSelect = item => {
        setSelected(item);
    }
    const tags = [
        'General', 'Identity', 'Relationship', 'Career', 'Accomplishment', 'Hardship'
    ]

    const tagStamps = [
        { tag:'General', url: 'https://i.imgur.com/4ZQ9Z0C.png' },
        { tag: 'Identity', url: 'https://i.imgur.com/4ZQ9Z0C.png' },
        { tag: 'Relationship', url:'https://i.imgur.com/4ZQ9Z0C.png' },
        { tag: 'Career', url: 'https://i.imgur.com/4ZQ9Z0C.png' },
        { tag: 'Accomplishment', url: 'https://i.imgur.com/4ZQ9Z0C.png' },
        { tag: 'Hardship', url: 'https://i.imgur.com/4ZQ9Z0C.png' }
    ]

    const tagStamps2 = {
        General: 'https://i.imgur.com/4ZQ9Z0C.png',
        Identity: 'https://i.imgur.com/4ZQ9Z0C.png',
        Relationship: 'https://i.imgur.com/4ZQ9Z0C.png',
        Career: 'https://i.imgur.com/4ZQ9Z0C.png',
        Accomplishment: 'https://i.imgur.com/4ZQ9Z0C.png',
        Hardship: 'https://i.imgur.com/4ZQ9Z0C.png'
    }

    const handleStampChange = (tag) => {
        if (tag == 'General') {
            setStamp('https://cdn.discordapp.com/attachments/694290659733143563/1076622014812528701/stampGeneral.png')
        }
        else if (tag == 'Identity') {
            setStamp('https://cdn.discordapp.com/attachments/694290659733143563/1076628378834178059/stampIdentity.png')
        }
        else if (tag == 'Relationship') {
            setStamp('https://media.discordapp.net/attachments/694290659733143563/1076625650955329556/stampRelationship2.png?width=594&height=595')
        }
        else if (tag == 'Career') {
            setStamp('https://cdn.discordapp.com/attachments/694290659733143563/1076628378834178059/stampIdentity.png')
        }
        else if (tag == 'Accomplishment') {
            setStamp('https://cdn.discordapp.com/attachments/694290659733143563/1076633671194394795/stampAccomplishments2.png')
        }
        else if (tag == 'Hardship') {
            setStamp('https://cdn.discordapp.com/attachments/694290659733143563/1076634770643103975/stampHardships.png')
        }

    }
	

    const handleTagChange = (tag) => {
        console.log("tag changed: ", tag.value)
        setTag(tag);
        handleStampChange(tag.value)
        // also maybe set the stamp icon? 
		// setStamp(tagStamps.tag);
		console.log(stamp)
    };

	

    const handleMsgChange = (e) => {
        setMsg(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //alert(`the message: ${msg}`)
        AddPin(msg, lat, lng, tag)
		closeModal()
    }

    const handleFilterChange = (e) => { // IDK IF THIS WORKS
        console.log("Filter changed: ", e.value)
        if (e == null) {
            setFilteredPins(pins)
        }
        else if (e.value == 'No Filter') {
            setFilteredPins(pins)
        }
        else {
            var temp = pins.filter(pin => pin.tag.value == e.value)
            setFilteredPins(temp)
        }
    }
    
    const filterOptions = [
        { value: 'No Filter', label: 'No Filter' },
        { value: 'General', label: 'General' },
        { value: 'Identity', label: 'Identity' },
        { value: 'Relationship', label: 'Relationship' },
        { value: 'Career', label: 'Career' },
        { value: 'Accomplishment', label: 'Accomplishment' },
        { value: 'Hardship', label: 'Hardship' }
    ]

    const inputTextStyling = {
        width: "100%",
        height: "150px",
        padding: "12px 20px",
        boxSizing: "border-box",
        border: "1px solid #ccc",
        borderRadius: "2px",
        resize: "none",
        wrap: "soft"
    }

	

    return (
        <LoadScript
            googleMapsApiKey={config.MY_KEY}>
                { loading ? <LoadingScreen/> :
            <GoogleMap
                options={{ styles: [{ elementType: "labels", featureType: "poi", stylers: [{ visibility: "off", }], }], }}
                mapContainerStyle={mapStyles}
                clickableIcons={false}
                zoom={13}
                center={defaultCenter}
                //onClick = {(e) => console.log("lat and long:", e.latLng.lat(), e.latLng.lng())}> 
                //onClick = {(e) => AddPin("Test Location", "test message", e.latLng.lat(), e.latLng.lng())}
                onClick={(e) => openModal(e)}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
					ariaHideApp={false}
                    contentLabel="Example Modal">
                    <div style={{display: "inline", marginBottom: "20px"}}>
                        <h4 style={{width: "50%", marginRight: "19em", marginLeft: "0em", display:"inline"}}>Tell Your Story!</h4>
                        <IconButton style={{}} onClick={closeModal}><CloseIcon /></IconButton>
                    </div>
                    <form id="addpin-modal" onSubmit={handleSubmit} >
                        <div>What is this moment about?</div>
						<div style={{width: '100%', display:"flex"}}>
							<div style={{width: '65%'}}>
							<Dropdown options={tags} onChange={handleTagChange} value={tag} placeholder="Define this Moment" />

							</div>
							<img style={{width: '45px', height: '50px', paddingLeft: "5em"}} src={stamp} />	
						</div>
                        <br />
                        <div>Describe your experience!</div>
                        <textarea form="addpin-modal" style={inputTextStyling} onChange={handleMsgChange} value={msg}></textarea>
                        <br />
                        <Button type="submit" color="secondary">Send letter</Button>
                    </form>
                </Modal>
                {
                    filteredPins.map(item => {
                        return (
                            <Marker
                                icon = {"https://cdn.discordapp.com/attachments/694290659733143563/1076637726822113280/mailbox_30x37-2.png"}
                                key={item.docId}
                                position={{lat: item.latitude, lng: item.longitude}}
                                onClick={() => onSelect(item)}
                            ></Marker>
                        )
                    })
                }
                {
                    selected.message &&
                    (
                        <InfoWindow
                            position={{lat:selected.latitude, lng:selected.longitude}}
                            clickable={true}
                            onCloseClick={() => setSelected({})}
                        >
                            <p>{selected.message}</p>
                        </InfoWindow>
                    )
                }
            </GoogleMap>}
            <div style={{width: "12%", padding: "1em"}}>
                <Dropdown options={filterOptions} onChange={handleFilterChange} placeholder="Filter by Experience" />
            </div>
        </LoadScript>
    )
}