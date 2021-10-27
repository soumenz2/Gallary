import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({navigation}) => {
  var tempApi = ` https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`;
  const [data, setData] = useState([]);
  const storeData = async tempData => {
    try {
      await AsyncStorage.setItem('data', JSON.stringify(tempData));
    } catch (e) {
      alert(e);
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('data');
      if (value !== null) {
        const td = JSON.parse(value);
        setData(td);
      }
    } catch (e) {
      alert(e);
    }
  };

  const fetchdata = async api => {
    await getData();
    try {
      let tempData = await Axios.get(api);
      var t = [];
      tempData.data.photos.photo.map(loc => {
        t.push(loc.url_s);
      });
      setData(t);
      storeData(t);
    } catch (e) {
      Snackbar.show({
        text: 'Please Check Your Network',
        textColor: 'rgba(0,0,0,1)',
        backgroundColor: 'rgba(120,230,40,0.65)',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Retry',
          textColor: '#1C56F6',
          onPress: () => fetchdata(tempApi),
        },
      });
    }
  };
  useEffect(() => {
    fetchdata(tempApi);
  }, []);

  
  
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <View>
        <View
          style={{
            backgroundColor: '#121417',
            // alignItems: 'center',
            // justifyContent:'center',
            height: windowHeight * 0.08,
            flexDirection: 'row',
            padding: 10,
            // borderColor:"#FFB600"
          }}>
          <View>
            <TouchableOpacity
              style={{paddingEnd: 10}}
              onPress={() => navigation.openDrawer()}>
              <FontAwesome
                style={{color: '#FFB600'}}
                name="align-justify"
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                color: '#FFB600',
                fontWeight: 'bold',
                fontSize: 24,
              }}>
              Home
            </Text>
          </View>
        </View>
        
      </View>
      <View>
        <ScrollView style={styles.container}>
          <StatusBar backgroundColor="#000" />
          <View>
            {data.length > 1 ? (
              <View style={styles.subContainer}>
                {data.map((loc, index) => {
                  () => {
                    console.log(images[index]);
                  };
                  return (
                    <View key={index} style={styles.box}>
                      <Image source={{uri: loc}} style={styles.img} />
                    </View>
                  );
                })}
              </View>
            ) : (
              <ActivityIndicator
                color="#f55"
                style={{marginTop: windowHeight * 0.4}}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    backgroundColor: 'rgba(60,190,100,0.4)',
  },
  container: {
    // flex: 1,
    backgroundColor: '#8A8A8A',
    borderTopColor: '#FFB600',
  },
  subContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: windowWidth * 0.021,
    paddingVertical: windowHeight * 0.018,
    justifyContent: 'space-around',
  },
  img: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.45,
    borderRadius: 12,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.205,
    width: windowWidth * 0.46,
    borderRadius: 12,
    elevation: 5,
    marginVertical: windowHeight * 0.003,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: windowWidth * 0.021,
    // paddingVertical: windowHeight * 0.018,
    justifyContent: 'space-around',
    elevation: 5,
  },
  searchBox: {
    backgroundColor: 'rgba(130,30,250,0.2)',
    borderRadius: 15,
  },
});

export default Home;
