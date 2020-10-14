import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { speakersReducer } from './speakersReducer';
//import SpeakerData from './SpeakerData';

function useSpeakerDataManager () {
  const [{ isLoading, speakerList, favoriteClickCount }, dispatch] = useReducer(speakersReducer, {
    isLoading: true,
    speakerList: [],
    favoriteClickCount: 10,
  });

  function incrementFavoriteClickCount() {
    dispatch({
      type: 'incrementFavoriteClickCount',
    });
  }

  function toggleSpeakerFavorite(speakerRec) {
    const updateData = async function() {
      axios.put(`http://localhost:4000/speakers/${speakerRec.id}`, speakerRec);
      speakerRec.favorite === true ?
        dispatch({type: "unfavorite", id: speakerRec.id}) :
        dispatch({type: "favorite", id: speakerRec.id});
    };
    updateData();
  }

  useEffect(() => {
    // new Promise(function (resolve) {
    //   setTimeout(function () {
    //     resolve();
    //   }, 1000);
    // }).then(() => {
    //   //setSpeakerList(speakerListServerFilter);
    //   dispatch({
    //     type: "setSpeakerList",
    //     data: SpeakerData
    //   });
    // });
    const fetchData = async function() {
      console.log('fetch Data..');
      let result = await axios.get('http://localhost:4000/speakers');
      dispatch({type: 'setSpeakerList', data: result.data})
    }
    fetchData();
    return () => {
      console.log('cleanup');
    };
  }, []); // [speakingSunday, speakingSaturday]);
  return {
    isLoading,
    speakerList,
    favoriteClickCount,
    incrementFavoriteClickCount,
    toggleSpeakerFavorite
  };
}

export default useSpeakerDataManager;
