import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

const MCQScreen = () => {
  let Route=useRoute();
  const [selectedOptions, setSelectedOptions] = useState([]);
  console.log(Route.params);
  const [data, Setata] = useState(Route.params.Data);
  const [Data,SetData]=useState([])
  // const data = [
  //   {
  //     question: 'What is the capital of France?',
  //     options: ['Paris', 'Madrid', 'Berlin', 'Rome'],
  //     answerIndex: 0,
  //   },
  //   {
  //     question: 'Who painted the Mona Lisa?',
  //     options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
  //     answerIndex: 0,
  //   },
  // ];

  const handleOptionPress = (questionIndex, optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };
  const SHowMcq = (index,optionIndex,question, correctindex) => {
    console.log("Index",index);
    console.log("OptionIndex",optionIndex);
    console.log("Question",question);
    console.log("Correctindex",correctindex);
    console.log("Option_index",data[index]);
    const cellIndex = data[index].Options.findIndex(item => item === correctindex);
    console.log(cellIndex);
    handleOptionPress(index, cellIndex)
    const d = {
      "question": question, "correctindex": cellIndex
    }
    const d1 = Data.filter((e) => e.question != question);
    // const finaldata=d;
    // Data.filter((item)=>)
    SetData(() => [...d1, d])
    // console.log(Data);
  }

  const renderItem = ({ item, index }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{item.Question}</Text>
      {item.Options.map((option, optionIndex) => (
        <>
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedOptions[index] === optionIndex && styles.selectedOptionButton,
            ]}
            onPress={() => handleOptionPress(index, optionIndex)}
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
            <TouchableOpacity style={{
              width: '30%', fontSize: 16,
              color: 'lightgray',
              borderWidth: 1,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              backgroundColor: "lightgray",
              borderColor: "lightgray"
            }}

              onPress={() => SHowMcq(index, item.Correct_Option,item.Question, item.Correct_Option)}

            >
              <Text>View Mcq</Text>

            </TouchableOpacity> : null

          }
          {optionIndex==3?

            // Data.map((e) => {
            //   if (e.question == item.question) {
            //     return (<View style={{ height: 30, top:10,left:10 }}>
            //       <Text style={{ color: "black" }}>{item.options[item.answerIndex]}</Text>
            //     </View>)

            //   }
            // })
            null
            :null
          }



        </>

      ))}

      {/* {console.log(item.options.length)} */}
    </View>
  );

  return (
    <View style={styles.container}>

{data.length<=0?
<View  style={{flex:1,justifyContent:'center',alignItems:"center"}}>
<Text>Data Not Found</Text>
  </View>

:


      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.question}
      />
}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
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
    backgroundColor: '#00cc00',
    borderColor: '#00cc00',
  },
  optionTitle: {
    fontSize: 16,
    color: '#444',
  },
  selectedOptionTitle: {
    color: '#fff',
  },
});

export default MCQScreen;
