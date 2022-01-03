import React, {useState} from 'react';
import {Dimensions, View, StyleSheet} from "react-native";
import MapView, {Marker} from 'react-native-maps';

const mapView = ({route}) => {
    const {latitude, longitude, title} = route.params;
    const [place, setPlace] = useState()
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude
                    }}
                    title={title}
                    description={"description"}
                />
            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
export default mapView;