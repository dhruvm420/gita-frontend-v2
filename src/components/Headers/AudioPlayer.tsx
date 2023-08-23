import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { connect } from "react-redux";
import Link from "next/link";
import Image from "next/image";

interface Props {
  currentVerse: GitaVerse;
  playerIsOpen: boolean;
  closePlayerModal: () => void;
}

function AudioPlayer({ playerIsOpen, closePlayerModal, currentVerse }: Props) {
  const refs = useRef<HTMLAudioElement[] | HTMLImageElement>([]);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const play = () => {
    if (refs.current[1].paused) {
      refs.current[1].play();
      refs.current[0].src = "/pause.svg";
      setIsAudioPlaying(true);
    } else {
      refs.current[1].pause();
      refs.current[0].src = "/play.svg";
      setIsAudioPlaying(false);
    }
  };

  const endFunction = () => {
    refs.current[1].currentTime = 0;
    refs.current[1].load();
    refs.current[0]?.src ? (refs.current[0].src = "/play.svg") : null;

    setIsAudioPlaying(false);
  };

  const playback = (speed: number) => {
    if (!refs.current[1].paused) {
      refs.current[1].load();
      refs.current[1].playbackRate = speed;
      refs.current[1].play();
    } else {
      refs.current[1].load();
      refs.current[1].playbackRate = speed;
    }
  };

  useEffect(() => {
    const scriptTag = document.createElement("script");
    const scrptTag = document.createElement("script");
    scrptTag.src = "https://code.jquery.com/jquery-2.2.4.min.js";
    scrptTag.crossOrigin = "anonymous";
    scrptTag.integrity = "sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=";

    scriptTag.src = "/js/audioseeker.js";
    scriptTag.async = true;

    document.body.appendChild(scriptTag);
    document.body.appendChild(scrptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    if (playerIsOpen && refs.current[0]?.src) {
      refs.current[0].src = "/pause.svg";

      refs.current[1].play();
    }
  }, [currentVerse?.id, playerIsOpen]);

  //below use effect is not working
  useEffect(() => {
    if (playerIsOpen && !refs.current[1].paused) {
      refs.current[0]?.src ? (refs.current[0].src = "/pause.svg") : null;
    }
  }, [playerIsOpen]);

  const prevId = currentVerse?.id - 1;
  const nextId = currentVerse?.id + 1;

  return (
    <div>
      <audio
        id="a1"
        ref={(element) => {
          refs.current[1] = element;
        }}
        src={`https://gita.github.io/gita/data/verse_recitation/${currentVerse?.chapter_number}/${currentVerse?.verse_number}.mp3`}
        onEnded={() => endFunction()}
      />
      <Transition appear show={playerIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 -top-20 z-10 overflow-y-auto"
          onClose={closePlayerModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-bg">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900 dark:text-gray-50 "
                >
                  BG {currentVerse?.chapter_number}.{currentVerse?.verse_number}
                </Dialog.Title>
                <div className="mt-2 border-b pb-8">
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    {currentVerse?.transliteration}
                  </p>
                </div>

                <div className="mt-4 flex justify-between px-4">
                  <Link
                    href={`/chapter/${currentVerse?.chapter_number}/verse/${prevId}`}
                    className={`hover:cursor-pointer  hover:brightness-90 dark:hover:brightness-50 ${
                      prevId <= 0 ? "pointer-events-none" : ""
                    }`}
                  >
                    <Image
                      src="/rewind.svg"
                      alt="rewind icon"
                      width={50}
                      height={50}
                    />
                  </Link>
                  <Image
                    id="play"
                    ref={(element) => {
                      refs.current[0] = element;
                    }}
                    className="cursor-pointer"
                    src={isAudioPlaying ? "/pause.svg" : "/play.svg"}
                    onClick={play}
                    width={54}
                    height={54}
                    alt="play or pause icon"
                  />
                  <Link
                    href={`/chapter/${currentVerse?.chapter_number}/verse/${nextId}`}
                    className={`hover:cursor-pointer  hover:brightness-90 dark:hover:brightness-50 ${
                      nextId > 701 ? "pointer-events-none" : ""
                    }`}
                  >
                    <Image
                      src="/forward.svg"
                      alt="forward icon"
                      width={50}
                      height={50}
                    />
                  </Link>
                </div>
                <div
                  className=" mx-auto my-3 flex h-2 w-full cursor-pointer items-center"
                  onClick={(event) => sayLoc(event)}
                >
                  <div
                    id="audiobar"
                    className="hp_slide h-1 w-full bg-light-orange"
                  >
                    <div className="hp_range h-1 bg-my-orange"></div>
                  </div>
                </div>

                <div className="mt-4">
                  <span className=" z-0 mt-4 flex w-full rounded-md shadow-sm">
                    <button
                      type="button"
                      className="grow items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:bg-dark-100 dark:text-gray-200 dark:hover:bg-dark-bg"
                      onClick={() => playback(0.75)}
                    >
                      0.75x
                    </button>
                    <button
                      type="button"
                      className="-ml-px grow items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:bg-dark-100 dark:text-gray-200 dark:hover:bg-dark-bg"
                      onClick={() => playback(1.0)}
                    >
                      1x
                    </button>

                    <button
                      type="button"
                      className="-ml-px grow items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:bg-dark-100 dark:text-gray-200 dark:hover:bg-dark-bg"
                      onClick={() => playback(1.5)}
                    >
                      1.5x
                    </button>
                    <button
                      type="button"
                      className="-ml-px grow items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:bg-dark-100 dark:text-gray-200 dark:hover:bg-dark-bg"
                      onClick={() => playback(2.0)}
                    >
                      2x
                    </button>
                  </span>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentVerse: state?.settings?.currentVerse,
  };
};

export default connect(mapStateToProps)(AudioPlayer);
