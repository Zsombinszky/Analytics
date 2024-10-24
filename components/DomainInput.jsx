import React from 'react'

const DomainInput = ({website, error, setWebsite, checkDomainAddedBefore, loading}) => (
    <div className="w-full items-center justify-center flex flex-col space-y-10">
    <span className="w-full lg:w-[50%] group">
      <p className="text-white/40 pb-4 group-hover:text-white smooth">Domain</p>
      <input
          className="input"
          value={website}
          onChange={(e) => setWebsite(e.target.value.trim().toLowerCase())}
          aria-label="Enter domain"
      />
      <p className={`text-xs pt-2 font-light ${error ? "text-red-400" : "text-white/20"}`}>
        {error || 'Enter the domain or subdomain without "www"'}
      </p>
    </span>
        {!error && (
            <button
                className={`button ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={checkDomainAddedBefore}
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Website"}
            </button>
        )}
    </div>
);

export default DomainInput