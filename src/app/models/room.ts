export class Room  {


  name!: string
  service_id!: ''
  owner_ref!: string
  settings!: {
    description: '',
    mode: '',
    scheduled: true,
    scheduled_time: '',
    adhoc: false,
    duration: '',
    participants: '',
    auto_recording: false,
    screen_share: true,
    canvas: false,
    abwd: true,
    media_configuration: '',
    quality: '',
    moderators: '',
    viewers: 0,
    active_talker: true,
    max_active_talkers: 16,
    encryption: false,
    watermark: false,
    single_file_recording: false,
    media_zone: ''
  }
  sip!: {
    "enabled": false
  }
  created!: ''
  room_id!: ''
}

export class RoomIn{
  nom!: string
  desc!:string
  date!:string
  duration!:number
}
export class Roomup{
  nom!: string
  desc!:string
  date!:string
  duration!:number
}
