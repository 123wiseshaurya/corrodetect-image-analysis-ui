
const AnalysisDescription = () => {
  return (
    <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
      <p>
        This tool analyzes images and C-Scan images to detect corrosion by calculating the percentage of 
        corroded areas. For regular images, it detects yellow (corroded) vs. green (healthy) areas. For C-Scan 
        images, it processes color patterns to identify corrosion.
      </p>
    </div>
  );
};

export default AnalysisDescription;
