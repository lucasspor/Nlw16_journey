import { View, Text, Image, Linking, Keyboard, Alert } from "react-native"
import { Input } from "@/components/input"
import { ArrowRight, AtSign, Calendar as IconCalendar, MapPin, Settings2, UserRoundPlus } from "lucide-react-native"
import { colors } from "@/styles/colors"
import { Button } from "@/components/button"
import { useState } from "react"
import { Modal } from "@/components/modal"
import { Calendar } from "@/components/calendar"
import { calendarUtils, DatesSelected } from '@/utils/calendarUtils'
import { DateData } from "react-native-calendars"
import dayjs from "dayjs"
import { GuestEmail } from "@/components/email"
import { validateInput } from "@/utils/validateInput"

enum StepForm {
  TRIP_DETAIlS = 1,
  ADD_EMAIL = 2,
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  GUESTS = 2
}

export default function Index() {
  const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAIlS)
  //destinos
  const [destination, setDestination] = useState("")
  //data
  const [selectedDates, setSelectedDates] = useState({} as DatesSelected)
  //modal
  const [showModal, setShowModal] = useState(MODAL.NONE)
  //email
  const [emailToInvite, setEmailToInvite] = useState("")
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  function handleNextStepForm() {
    if (destination.trim().length === 0 || !selectedDates.startsAt || !selectedDates.endsAt) {
      return Alert.alert("Preencha todos dos da viagem.")
    }

    if (destination.length < 4) {
      Alert.alert("O destino deve conter pelo mesno 4 caracteres")
    }

    if (stepForm === StepForm.TRIP_DETAIlS) {
      return setStepForm(StepForm.ADD_EMAIL)
    }
  }

  function handleSelectedDate(selectedDay: DateData) {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay
    })

    setSelectedDates(dates)
  }

  function handleRemoveEmail(emailToRemove: string) {
    setEmailsToInvite((prevState) =>
      prevState.filter((email) => email !== emailToRemove))
  }

  function handleAddEmail() {
    if (!validateInput.email(emailToInvite)) {
      return Alert.alert("convidado", "E-mail inválido")
    }

    const emailAlreadyExist = emailsToInvite.find(
      (email) => email === emailToInvite
    )

    if(emailAlreadyExist){
      return Alert.alert("convidado", "E-mail Já foi adicionado")
    }

    setEmailsToInvite((prevState) => [...prevState, emailToInvite])
    setEmailToInvite("")
  }

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Image source={require("@/assets/logo.png")} className="h-11" resizeMode="contain" />
      <Image source={require("@/assets/bg.png")} className="absolute" />
      <Text className="text-zinc-400 font-regular text-center py-1 text-lg mt-3">
        Convide seus amigos e planeje sua {"\n"} próxima viagem!
      </Text>

      <View className="w-full bg-zinc-900 p-4 rounded-xl my-8 border">
        <Input variant="primary">
          <MapPin size={20} color={colors.zinc[400]} />
          <Input.Field
            placeholder="Para onde?"
            onChangeText={setDestination}
            value={destination}
            editable={stepForm === StepForm.TRIP_DETAIlS} />
        </Input>
        <Input variant="primary">
          <IconCalendar size={20} color={colors.zinc[400]} />
          <Input.Field
            placeholder="Quando?"
            editable={stepForm === StepForm.TRIP_DETAIlS}
            onFocus={() => Keyboard.dismiss()}
            showSoftInputOnFocus={false}
            onPressIn={() => stepForm === StepForm.TRIP_DETAIlS && setShowModal(MODAL.CALENDAR)}
            value={selectedDates.formatDatesInText} />
        </Input>

        {stepForm === StepForm.ADD_EMAIL &&

          <>
            <View className="border-b border-zinc-800 py-4">
              <Button variant="secondary" onPress={() => setStepForm(StepForm.TRIP_DETAIlS)} isLoading={false}>
                <Button.Title>Alterar Local/Data</Button.Title>
                <Settings2 size={16} color={colors.zinc[200]} />
              </Button>
            </View>

            <Input variant="primary">
              <UserRoundPlus size={20} color={colors.zinc[400]} />
              <Input.Field
                placeholder="Quem estará na viagem?"
                onFocus={() => Keyboard.dismiss()} 
                autoCorrect={false}
                value={
                  emailsToInvite.length > 0 ? `${emailsToInvite.length} pessoas(a) convidadas(s)` : ""
                }
                onPress={() => {
                  Keyboard.dismiss()
                  setShowModal(MODAL.GUESTS)
                }}
                showSoftInputOnFocus={false}/>
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

      <Modal
        title={"Selecionar datas"}
        subtitle="Selecione a data de ida e volta"
        visible={showModal === MODAL.CALENDAR}
        onClose={() => setShowModal(MODAL.NONE)}>
        <View className="gap-4 mt-4">
          <Calendar
            minDate={dayjs().toISOString()}
            onDayPress={handleSelectedDate}
            markedDates={selectedDates.dates}
          />
          <Button onPress={() => setShowModal(MODAL.NONE)}>
            <Button.Title>
              Confirmar
            </Button.Title>
          </Button>

        </View>
      </Modal>

      <Modal
        title="Selecionar Convidados"
        subtitle="Os convidados irão recever e-mails  para confirmar a participação na viagem"
        visible={showModal === MODAL.GUESTS}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="my-2 flex-wrap gap-2 border-b border-zinc-800 py-5 items-start">
          {
            emailsToInvite.length > 0 ? (
              emailsToInvite.map((email) => (
                <GuestEmail key={email} email={email} onRemove={() => handleRemoveEmail(email)} />
              ))
            ) : (
              <Text className="text-zinc-600 text-base font-regular">Nenhum e-mail adicionado.</Text>
            )
          }

        </View>
        <View className="gap-4 mt-4">
          <Input variant="secondary">
            <AtSign color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Digite o e-mail do convidado"
              keyboardType="email-address"
              onChangeText={(text) => setEmailToInvite(text.toLowerCase())}
              value={emailToInvite} 
              returnKeyType="send"
              onSubmitEditing={handleAddEmail}/>
          </Input>

          <Button onPress={handleAddEmail}>
            <Button.Title>Convidar</Button.Title>
          </Button>

        </View>
      </Modal>
    </View>
  )
}