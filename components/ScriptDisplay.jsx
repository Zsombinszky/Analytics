import React from 'react'
import {ClipboardPlus, CopyCheck} from 'lucide-react';


const ScriptDisplay = ({website, isCopied, copyScript, router, textareaRef}) => {

    const scriptURL = process.env.NEXT_PUBLIC_TRACKING_SCRIPT_URL;

    return (
        <div className="w-full items-center justify-center flex flex-col space-y-10">
    <span className="w-full lg:w-[50%]">
      <button onClick={copyScript} aria-label="Copy script">
        {isCopied ? <CopyCheck className="text-green-500"/> : <ClipboardPlus/>}
      </button>
      <textarea
          ref={textareaRef}
          className="input text-white/20 cursor-pointer"
          disabled
          value={`<script defer data-domain="${website}" src="${scriptURL}"></script>`}
          aria-label="Generated tracking script"
      />
      <p className="text-xs text-white/20 pt-2 font-light">
        Paste this snippet in the <b className="text-red-600">&lt;head&gt;</b> of your website
      </p>
    </span>
            <button onClick={() => router.push(`/w/${website.trim()}`)} className="added-btn">
                Added
            </button>
        </div>
    )
};

export default ScriptDisplay
