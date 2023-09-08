import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import ResultScreen from './ResultScreen';

const Test = () => {
    let Route = useRoute()
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [Data, SetData] = useState([]);
    var [Total_archive,setTotal_archive] = useState(0);
    var [Total_Correct,setTotal_Correct] = useState(0);
    var [Total_Wrong,SetTotal_Wrong] = useState(0);
    let navigation=useNavigation();

    const [data, setdata] = useState(Route.params.Data);

    const handleOptionPress = (questionIndex, optionIndex, Correct) => {
        // Check if the option for the question is already selected
        if (selectedOptions[questionIndex] !== undefined) {
            console.log("Total",Total_archive);
            console.log(data.length);
            return; // Return early if an option is already selected for this question
        }

        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[questionIndex] = optionIndex;
        setSelectedOptions(newSelectedOptions);
        const cellIndex = data[questionIndex].Options.findIndex(item => item === Correct);
        if (cellIndex == optionIndex) {
            // Total_Correct++;
            setTotal_Correct(Total_Correct+1)
            setTotal_archive(Total_archive+1)
            // Total_archive=Total_archive+1;
            
            console.log("Okey");
        } else {
            
            SetTotal_Wrong(Total_Wrong+1)
            // Set
            setTotal_archive(Total_archive+1)
        }


    };

    //   const SHowMcq = (index,optionIndex,question, correctindex) => {
    //     handleOptionPress(index, optionIndex)
    //     const d = {
    //       "question": question, "correctindex": correctindex
    //     }
    //     const d1 = Data.filter((e) => e.question != question);
    //     // const finaldata=d;
    //     // Data.filter((item)=>)
    //     SetData(() => [...d1, d])
    //     // console.log(Data);
    //   }

    const renderItem = ({ item, index }) => (
        <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.Question}</Text>
            {item.Options.map((option, optionIndex) => (
                <>
                    <TouchableOpacity
                        disabled={selectedOptions[index] ? true : false}
                        key={option}
                        style={[
                            styles.optionButton,
                            selectedOptions[index] === optionIndex ? styles.selectedOptionButton : null,
                        ]}
                        onPress={() => handleOptionPress(index, optionIndex, item.Correct_Option)}
                    >
                        <Text style={[
                            styles.optionTitle,
                            selectedOptions[index] === optionIndex && styles.selectedOptionTitle,
                        ]}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                    {/* {console.log(optionIndex)} */}

                    {optionIndex == 3 ?

                        // Data.map((e) => {
                        //   if (e.question == item.question) {
                        //     return (<View style={{ height: 30, top:10,left:10 }}>
                        //       <Text style={{ color: "black" }}>{item.options[item.answerIndex]}</Text>
                        //     </View>)

                        //   }
                        // })
                        null
                        : null
                    }



                </>

            ))}

            {/* {console.log(item.options.length)} */}
        </View>
    );

    return (
        <View style={styles.container}>
           {data.length<=0?
           <View  style={{flex:1,justifyContent:"center",alignItems:"center"}}>

            <Text>Data Not Found</Text>
           </View>

           :
           <>
           <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.question}
            />
            <TouchableOpacity style={{
                width: "90%",
                height: 44,
                backgroundColor: data.length == Total_archive ? "#003494" : "#808493",
                // ,
                position: "absolute",
                bottom: 10,
                alignSelf: "center", // Horizontally center the view
                justifyContent: "center", // Vertically center the content inside the view
                alignItems: "center",
            }}
            
            onPress={data.length == Total_archive? ()=>navigation.navigate("Result",{
                correctAnswers: Total_Correct,
                wrongAnswers :Total_Wrong
            }):null}
            >
                <Text style={{ color: 'white', fontSize: 18 }}>Submit</Text>
            </TouchableOpacity>
            </>
}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        // alignItems:"center"
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionButton: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    selectedOptionButton: {
        backgroundColor: '#00401A',
        borderColor: '#00401A',
    },
    optionTitle: {
        fontSize: 16,
        color: '#444',
    },
    selectedOptionTitle: {
        color: '#fff',
    },
});

export default Test;
