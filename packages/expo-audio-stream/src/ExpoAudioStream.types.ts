// packages/expo-audio-stream/src/ExpoAudioStream.types.ts
import {
    AmplitudeAlgorithm,
    AudioAnalysis,
    AudioFeaturesOptions,
} from './AudioAnalysis/AudioAnalysis.types'
import { AudioAnalysisEvent } from './events'

export interface AudioStreamStatus {
    isRecording: boolean
    isPaused: boolean
    durationMs: number
    size: number
    interval: number
    mimeType: string
}

export interface AudioDataEvent {
    data: string | Float32Array
    position: number
    fileUri: string
    eventDataSize: number
    totalSize: number
}

export type EncodingType = 'pcm_32bit' | 'pcm_16bit' | 'pcm_8bit'
export type SampleRate = 16000 | 44100 | 48000
export type BitDepth = 8 | 16 | 32

export interface Chunk {
    text: string
    timestamp: [number, number | null]
}

export interface TranscriberData {
    id: string
    isBusy: boolean
    text: string
    startTime: number
    endTime: number
    chunks: Chunk[]
}

export interface AudioRecording {
    fileUri: string
    filename: string
    durationMs: number
    size: number
    mimeType: string
    channels: number
    bitDepth: BitDepth
    sampleRate: SampleRate
    transcripts?: TranscriberData[]
    wavPCMData?: Float32Array // Full PCM data for the recording in WAV format (only on web, for native use the fileUri)
    analysisData?: AudioAnalysis // Analysis data for the recording depending on enableProcessing flag
}

export interface StartRecordingResult {
    fileUri: string
    mimeType: string
    channels?: number
    bitDepth?: BitDepth
    sampleRate?: SampleRate
}

export interface RecordingConfig {
    // Sample rate for recording (16000, 44100, or 48000 Hz)
    sampleRate?: SampleRate

    // Number of audio channels (1 for mono, 2 for stereo)
    channels?: 1 | 2

    // Encoding type for the recording (pcm_32bit, pcm_16bit, pcm_8bit)
    encoding?: EncodingType

    // Interval in milliseconds at which to emit recording data
    interval?: number

    // Keep the device awake while recording (default is false)
    keepAwake?: boolean

    // Show a notification during recording (default is false)
    showNotification?: boolean

    // Show waveform in the notification (Android only, when showNotification is true)
    showWaveformInNotification?: boolean

    // Configuration for the notification
    notification?: NotificationConfig

    // Enable audio processing (default is false)
    enableProcessing?: boolean

    // Number of data points to extract per second of audio (default is 1000)
    pointsPerSecond?: number

    // Algorithm to use for amplitude computation (default is "rms")
    algorithm?: AmplitudeAlgorithm

    // Feature options to extract (default is empty)
    features?: AudioFeaturesOptions

    // Callback function to handle audio stream
    onAudioStream?: (_: AudioDataEvent) => Promise<void>

    // Callback function to handle audio features extraction results
    onAudioAnalysis?: (_: AudioAnalysisEvent) => Promise<void>
}

export interface NotificationConfig {
    // Title of the notification
    title?: string

    // Main text content of the notification
    text?: string

    // Icon to be displayed in the notification (resource name or URI)
    icon?: string

    // Android-specific notification configuration
    android?: {
        // Unique identifier for the notification channel
        channelId?: string

        // User-visible name of the notification channel
        channelName?: string

        // User-visible description of the notification channel
        channelDescription?: string

        // Unique identifier for this notification
        notificationId?: number

        // List of actions that can be performed from the notification
        actions?: NotificationAction[]

        // Configuration for the waveform visualization in the notification
        waveform?: WaveformConfig

        // Color of the notification LED (if device supports it)
        lightColor?: string

        // Priority of the notification (affects how it's displayed)
        priority?: 'min' | 'low' | 'default' | 'high' | 'max'

        // Accent color for the notification (used for the app icon and buttons)
        accentColor?: string
    }

    // iOS-specific notification configuration
    ios?: {
        // Identifier for the notification category (used for grouping similar notifications)
        categoryIdentifier?: string
    }
}

export interface NotificationAction {
    // Display title for the action
    title: string

    // Unique identifier for the action
    identifier: string

    // Icon to be displayed for the action (Android only)
    icon?: string
}

export interface WaveformConfig {
    color?: string // The color of the waveform (e.g., "#FFFFFF" for white)
    opacity?: number // Opacity of the waveform (0.0 - 1.0)
    strokeWidth?: number // Width of the waveform line (default: 1.5)
    style?: 'stroke' | 'fill' // Drawing style: "stroke" for outline, "fill" for solid
    mirror?: boolean // Whether to mirror the waveform (symmetrical display)
    height?: number // Height of the waveform view in dp (default: 64)
}

export interface UseAudioRecorderState {
    startRecording: (_: RecordingConfig) => Promise<StartRecordingResult>
    stopRecording: () => Promise<AudioRecording | null>
    pauseRecording: () => void
    resumeRecording: () => void
    isRecording: boolean
    isPaused: boolean
    durationMs: number // Duration of the recording
    size: number // Size in bytes of the recorded audio
    analysisData?: AudioAnalysis // Analysis data for the recording depending on enableProcessing flag
}
