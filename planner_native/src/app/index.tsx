import { View, Text, Image, Linking } from "react-native"
import { Input } from "@/components/input"
import { ArrowRight, Calendar, MapPin, Settings2, UserRoundPlus } from "lucide-react-native"

import { colors } from "@/styles/colors"
import { Button } from "@/components/button"
import { useState } from "react"

enum StepForm {
  TRIP_DETAIlS = 1,
  ADD_Email = 2,
}

export default function Index() {
  const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAIlS)

  function handleNextStepForm() {
    if (stepForm === StepForm.TRIP_DETAIlS) {
      return setStepForm(StepForm.ADD_Email)
    }
  }

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Image source={require("@/assets/logo.png")} className="h-11" resizeMode="contain" />
      <Image source={require("@/assets/bg.png")} className="absolute"/>
      <Text className="text-zinc-400 font-regular text-center py-1 text-lg mt-3">
        Convide seus amigos e planeje sua {"\n"} próxima viagem!
      </Text>

      <View className="w-full bg-zinc-900 p-4 rounded-xl my-8 border">
        <Input variant="primary">
          <MapPin size={20} color={colors.zinc[400]} />
          <Input.Field placeholder="Para onde?"  editable={stepForm === StepForm.TRIP_DETAIlS} />
        </Input>
        <Input variant="primary">
          <Calendar size={20} color={colors.zinc[400]} />
          <Input.Field placeholder="Quando?"  editable={stepForm === StepForm.TRIP_DETAIlS} />
        </Input>

        {stepForm === StepForm.ADD_Email &&

          <>
            <View className="border-b border-zinc-800 py-4">
              <Button variant="secondary" onPress={() => setStepForm(StepForm.TRIP_DETAIlS)} isLoading={false}>
                <Button.Title>Alterar Local/Data</Button.Title>
                <Settings2 size={16} color={colors.zinc[200]} />
              </Button>
            </View>

            <Input variant="primary">
              <UserRoundPlus size={20} color={colors.zinc[400]} />
              <Input.Field placeholder="Quem estará na viagem?" />
            </Input>
          </>
        }

        <Button onPress={handleNextStepForm} isLoading={false}>
          <Button.Title>{
            stepForm === StepForm.TRIP_DETAIlS ? "Continuar" : "Confirmar viagem"
          }</Button.Title>
          <ArrowRight size={16} color={colors.lime[950]} />
        </Button>
      </View>

      <Text className="text-zinc-500 font-regular text-center text-base">
        Ao planejar sua viagem pela plann.er você automaticamente concorda com nossos {" "} <Text className="text-zinc-300 underline" onPress={() => Linking.openURL('http://google.com')}>termos de uso</Text> e <Text className="text-zinc-300 underline" onPress={() => Linking.openURL('http://google.com')}>políticas de privacidade</Text>.
      </Text>
    </View>
  )
}